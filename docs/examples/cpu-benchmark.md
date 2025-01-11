# Robotic Dataflow Benchmark

![Screenshot 2025-01-11 at 11-01-37 dora-rs dora-rs](https://github.com/user-attachments/assets/3285d183-7560-40e1-ac02-30fee0f120cb) ![Screenshot 2025-01-11 at 11-01-43 dora-rs dora-rs](https://github.com/user-attachments/assets/d64370fc-b0ba-46af-be83-19d3c772ada6)


## Getting started

```bash
## If you do not have dora-rs installed
# sudo apt update && sudo apt-get install wget
cargo install dora-cli --locked
pip install dora-rs==0.3.2
## In development, within the dora-node-api-python folder, You can also use:
## maturin develop --release

## To test Python version of dora
cd dora-rs/py-latency
dora up

### For operators
dora start dataflow_op.yml --attach
# Ctrl + C at the end

cat benchmark_data.csv

## To test Rust version of dora
## This requires that dora-rs is placed at: "../../../dora/apis/rust/node"
cd dora-rs/rs-latency
cargo build --release --all
dora start dataflow.yml
```

## Getting started ROS2 Python

```bash
docker run --network=host -e DISPLAY=${DISPLAY} -v $(pwd):/dora-benchmark -it osrf/ros:humble-desktop

# Within the docker container
cd dora-benchmark/ros2/py_pubsub
colcon build
. install/setup.bash
ros2 run py_pubsub listener & ros2 run py_pubsub talker
cat time.csv
```
