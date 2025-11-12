# Inspecting Dataflows with the `topic` Command

Learn how to monitor and debug your dora dataflows in real-time 
using the new `dora topic` subcommands.

## Introduction

When building dataflow applications with dora, understanding what's 
happening between your nodes is crucial for debugging and optimization. 
Before the `topic` command, inspecting the data flowing through your 
dataflow required either:

- Adding debug print statements to your nodes
- Using an individual debug node
- Manually parsing (reading) logs

The new `dora topic` subcommand changes this by providing a set of 
intuitive CLI tools to inspect your running dataflows in real-time.

## Prerequisites

Before getting started, make sure you have:

- dora-cli installed (version 0.4.0 or later)
- A running dataflow (we'll use a simple example)

## Setting Up an Example Dataflow

Let's start with a simple dataflow that we can inspect:

```yml
# example_dataflow.yml
nodes:
  - id: tick
    path: ./tick.py
    inputs:
      trigger: dora/timer/millis/200
    outputs:
      - tick

  - id: tock
    path: ./tock.py
    inputs:
      tick: tick/tick
    outputs:
      - tock

_unstable_debug:
  publish_all_messages_to_zenoh: true
```

**Important**: To use the `topic` commands, your dataflow descriptor must include the following configuration snippet:

```yml
_unstable_debug:
  publish_all_messages_to_zenoh: true
```

This enables the runtime to publish messages to Zenoh, making them available for inspection. Without this configuration, the `echo` command will not be able to access the topic data.

Start the dataflow (of course, set up the coordinator and daemon using `dora up` first):
```bash
dora start example_dataflow.yml --name example
```

## Specifying the Target Dataflow

Before diving into the individual subcommands, it's important to understand how to specify which dataflow you want to inspect. All `dora topic` subcommands share a common set of options for selecting the target dataflow.

The dataflow selector consists of three options:

**`-d, --dataflow <UUID_OR_NAME>`**: Specifies which dataflow to inspect. You can provide either the dataflow's UUID or its name. If you only have one dataflow running, this option can be omitted and dora will automatically select it.

**`--coordinator-addr <IP>`**: The IP address where the dora coordinator is running. This defaults to `127.0.0.1` for local development. If you're inspecting a dataflow running on a remote machine or in a distributed setup, specify the coordinator's address here.

**`--coordinator-port <PORT>`**: The port number of the coordinator's control server. This defaults to `6012`. You only need to change this if you've configured your coordinator to use a non-standard port.

For example, to inspect a remote dataflow:

```bash
dora topic list --dataflow example \
                --coordinator-addr 192.168.1.100 \
                --coordinator-port 6012
```

In the following sections, we'll focus on the specific functionality of each subcommand, but remember that these dataflow selector options are available for all of them.

## Discovering Active Topics with `list`

The `dora topic list` command displays all outputs defined in a dataflow. This is typically your first step when inspecting a dataflow, as it shows you what data streams are available for monitoring.

```bash
dora topic list -d example
```

By default, the command prints topics in a human-readable table format. If you need machine-readable output for scripting or integration with other tools, use the `--format` option:

```bash
dora topic list -d example --format json
```

This is particularly useful when you want to programmatically discover what topics are available in a running dataflow, or when you need to verify that all expected outputs are active before starting your debugging session.

## Inspecting Topic Data with `echo`

The `dora topic echo` command displays the actual data being published on topics in real-time. This allows you to inspect the content and structure of messages flowing through your dataflow.

You can echo specific topics by providing their identifiers as arguments:

```bash
# Echo a single topic
dora topic echo -d example tick/tick

# Echo multiple topics
dora topic echo -d example tick/tick tock/tock
```

If no topics are specified, all outputs from the selected dataflow will be echoed:

```bash
dora topic echo -d example
```

Since dora uses Apache Arrow as its data format, the output shows a structured representation of your data. By default, this is displayed in a human-readable table format, but you can output JSON lines for programmatic processing:

```bash
dora topic echo -d example tick/tick --format json
```

## Measuring Topic Frequency with `hz`

The `dora topic hz` command measures the publish frequency of topics, helping you verify that your nodes are producing data at the expected rate. This is particularly useful for performance analysis and debugging timing issues.

Similar to `echo`, you can specify which topics to monitor:

```bash
# Measure frequency of a single topic
dora topic hz -d example tick/tick

# Monitor multiple topics
dora topic hz -d example tick/tick tock/tock
```

If no topics are specified, all outputs from the selected dataflow will be monitored.

The command calculates the frequency using a sliding window approach. By default, it uses a 10-second window, but you can adjust this with the `--window` option:

```bash
# Use a 5-second window for faster updates
dora topic hz -d example tick/tick --window 5
```

A smaller window provides more responsive feedback to frequency changes, while a larger window gives more stable measurements by averaging over a longer period.

## Common Debugging Workflows

### Workflow 1: "My node isn't receiving data"

1. Check if the topic exists:
   ```bash
   dora topic list -d <dataflow>
   ```

2. Verify the topic is being published:
   ```bash
   dora topic hz -d <dataflow> <topic_name>
   ```

3. Inspect the actual data:
   ```bash
   dora topic echo -d <dataflow> <topic_name>
   ```

### Workflow 2: "My pipeline is slower than expected"

1. Check publishing rates across the pipeline:
   ```bash
   dora topic hz -d <dataflow> webcam/image detector/bbox plotter/output
   ```

2. Identify the bottleneck (the topic that significantly lowers frequency)

3. Optimize the slow node or add parallel processing

### Workflow 3: "Data format mismatch between nodes"

1. Echo both the producer and consumer topics:
   ```bash
   dora topic echo -d <dataflow> producer/output --format json
   dora topic echo -d <dataflow> consumer/output --format json
   ```

2. Compare the Arrow schema structures

3. Update the data transformation logic

