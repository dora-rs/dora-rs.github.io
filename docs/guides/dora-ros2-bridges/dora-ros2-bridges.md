# Bridging ROS2

dora-ros2-bridge is an extension that we have build for people to use ROS2 easily.
One of the main issue with ROS2 is the complex build system. It would have been really hard for people to use dora on top of the ros2 build system so we have build this bridsge to be ROS2 compiler free. In order to do that, we convert every message at runtime into arrow struct format. This can be use to rapidly use AI models through numpy, pandas, ...

## Why dora-ros2-bridge?

> See: https://github.com/orgs/dora-rs/discussions/306

Current robotic community uses a lot of ROS2 for building robots. It's hard for them to switch entirely from ROS2. Building easy-to-use bridge for ROS 2 helps provide a simpler way to integrate and transition projects to/from dora. This also makes it easy to reuse ROS2 sensor node that does not provide any other API.

## Getting Started in Python

The following example can operate a simulation of the ROS2 turtlebot using dora.
It does not requires any compilation from colcon and only needs to be run with dora.

```python
#!/usr/bin/env python
# -*- coding: utf-8 -*-
import dora
from dora import Node

ros2_context = dora.Ros2Context()
ros2_node = ros2_context.new_node(
    "turtle_teleop", # name
    "/ros2_demo", # namespace
    dora.Ros2NodeOptions(rosout=True),
)

# Define a ROS2 QOS
topic_qos = dora.Ros2QosPolicies(
    reliable=True, max_blocking_time=0.1
)

# Create a publisher to cmd_vel topic
turtle_twist_topic = ros2_node.create_topic(
    "/turtle1/cmd_vel", "geometry_msgs/Twist", topic_qos
)
twist_writer = ros2_node.create_publisher(turtle_twist_topic)

# Create a listener to pose topic
turtle_pose_topic = ros2_node.create_topic(
    "/turtle1/pose", "turtlesim/Pose", topic_qos
)
pose_reader = ros2_node.create_subscription(turtle_pose_topic)

# Create a dora node
dora_node = Node()

# Listen for both stream on the same loop as Python does not handle well multiprocessing
dora_node.merge_external_events(pose_reader)

for i in range(500):
    event = dora_node.next()
    if event is None:
        break
    match event["kind"]:

        # Dora event
        case "dora":
            match event["type"]:
                case "INPUT":
                    match event["id"]:
                        case "direction":
                            twist_writer.publish(event["value"])

        # In this case ROS2 event
        case "external":
            pose = event["value"][0].as_py()
            dora_node.send_output("turtle_pose", event["value"])
```

## Getting started in Rust

The following example can operate the ROS2 turtlebot using dora.
It does not need colcon and only needs to be compiled natively with `cargo` and run with dora.

```rust
use dora_node_api::{
    self,
    dora_core::config::DataId,
    merged::{MergeExternal, MergedEvent},
    DoraNode, Event,
};
use dora_ros2_bridge::{
    geometry_msgs::msg::{Twist, Vector3},
    ros2_client::{self, ros2, NodeOptions},
    rustdds::{self, policy},
    turtlesim::msg::Pose,
};
use eyre::Context;

fn main() -> eyre::Result<()> {
    let mut ros_node = init_ros_node()?;
    let turtle_vel_publisher = create_vel_publisher(&mut ros_node)?;
    let turtle_pose_reader = create_pose_reader(&mut ros_node)?;

    // Initialize dora node
    let output = DataId::from("pose".to_owned());
    let (mut node, dora_events) = DoraNode::init_from_env()?;

    // Merge both stream into one loop.
    let merged = dora_events.merge_external(Box::pin(turtle_pose_reader.async_stream()));
    let mut events = futures::executor::block_on_stream(merged);

    for i in 0..1000 {
        let event = match events.next() {
            Some(input) => input,
            None => break,
        };

        match event {
            MergedEvent::Dora(event) => match event {
                Event::Input {
                    id,
                    metadata: _,
                    data: _,
                } => match id.as_str() {
                    "tick" => {
                        let direction = Twist {
                            linear: Vector3 {
                                x: rand::random::<f64>() + 1.0,
                                ..Default::default()
                            },
                            angular: Vector3 {
                                z: (rand::random::<f64>() - 0.5) * 5.0,
                                ..Default::default()
                            },
                        };
                        println!("tick {i}, sending {direction:?}");
                        turtle_vel_publisher.publish(direction).unwrap();
                    }
                    other => eprintln!("Ignoring unexpected input `{other}`"),
                },
                Event::Stop => println!("Received manual stop"),
                other => eprintln!("Received unexpected input: {other:?}"),
            },
            MergedEvent::External(pose) => {
                println!("received pose event: {pose:?}");
                if let Ok((pose, _)) = pose {
                    let serialized = serde_json::to_string(&pose)?;
                    node.send_output_bytes(
                        output.clone(),
                        Default::default(),
                        serialized.len(),
                        serialized.as_bytes(),
                    )?;
                }
            }
        }
    }

    Ok(())
}

fn init_ros_node() -> eyre::Result<ros2_client::Node> {
    let ros_context = ros2_client::Context::new().unwrap();

    ros_context
        .new_node(
            "turtle_teleop", // name
            "/ros2_demo",    // namespace
            NodeOptions::new().enable_rosout(true),
        )
        .context("failed to create ros2 node")
}

// Publish on vel_cmd topic
fn create_vel_publisher(
    ros_node: &mut ros2_client::Node,
) -> eyre::Result<ros2_client::Publisher<Twist>> {
    let topic_qos: rustdds::QosPolicies = {
        rustdds::QosPolicyBuilder::new()
            .durability(policy::Durability::Volatile)
            .liveliness(policy::Liveliness::Automatic {
                lease_duration: ros2::Duration::DURATION_INFINITE,
            })
            .reliability(policy::Reliability::Reliable {
                max_blocking_time: ros2::Duration::from_millis(100),
            })
            .history(policy::History::KeepLast { depth: 1 })
            .build()
    };

    let turtle_cmd_vel_topic = ros_node
        .create_topic(
            "/turtle1/cmd_vel",
            String::from("geometry_msgs::msg::dds_::Twist_"),
            &topic_qos,
        )
        .context("failed to create topic")?;

    // The point here is to publish Twist for the turtle
    let turtle_cmd_vel_writer = ros_node
        .create_publisher::<Twist>(&turtle_cmd_vel_topic, None)
        .context("failed to create publisher")?;
    Ok(turtle_cmd_vel_writer)
}

// Listen for pose topic
fn create_pose_reader(
    ros_node: &mut ros2_client::Node,
) -> eyre::Result<ros2_client::Subscription<Pose>> {
    let turtle_pose_topic = ros_node
        .create_topic(
            "/turtle1/pose",
            String::from("turtlesim::msg::dds_::Pose_"),
            &Default::default(),
        )
        .context("failed to create topic")?;
    let turtle_pose_reader = ros_node
        .create_subscription::<Pose>(&turtle_pose_topic, None)
        .context("failed to create subscription")?;
    Ok(turtle_pose_reader)
}

```
