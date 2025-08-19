<!---
This file is auto-generated using:
npm run update-cli
-->

# CLI Commands

Dora's _command line interface_ (CLI) is the main way to control and inspect Dora dataflows.
The CLI provides commands to build and run dataflows, both locally and on remote remote machines.
It also provides various helper commands, for example for creating new nodes from a template or for visualizing a dataflow graph.

## Local Build & Run

The two most important commands when getting started are `dora build` and `dora run`.

- **`dora build`** reads the [build](../dataflow-config/#build) and [git](../dataflow-config/#git) fields of the given [dataflow configuration file](../dataflow-config/) and executes the specified clone and build instructions.
  - If the dataflow contains Python nodes, you can pass the `--uv` argument to `dora build` to replace `pip` commands with [`uv`](https://docs.astral.sh/uv/) commands
- **`dora run`** starts a dataflow locally. Each node is spawned as specified in its [`path`](../dataflow-config/#path-required) and [`args`](../dataflow-config/#args-and-env) fields.
  - it does not run any build commands, so you might want to run `dora build` before
  - `dora run` _attaches_ to the started dataflow. This means that the dataflow logs are printed to the terminal and that the dataflow is stopped on `ctrl-c`.
  - If the dataflow contains Python nodes, you can pass the `--uv` argument to `dora run` to invoke nodes whose `path` ends with `.py` through [`uv`](https://docs.astral.sh/uv/)

With just these two commands you should be ready to get started!

## Helper Commands

The Dora CLI provides some commands that help during development:

- `dora new` helps with creating new nodes and dataflows from templates
  - Example: run the following to create a new Python node: `dora new my_node_name --kind node --lang python`
- `dora graph` visualizes a given dataflow configuration file as a graph
  - pass `--open` to view the generated graph in your web browser
  - pass `--mermaid` to create a [mermaid](https://mermaid.live/) diagram description
- the `dora self` command allows updating and uninstalling dora
- the `dora help` command prints help text

## Distributed Build & Run

Dataflows can be run in a distributed fashion, where its nodes are running on different machines.
This makes it possible, for example, to move compute-intensive nodes to more powerful machines, e.g. in the cloud.

Working with distributed dataflows is more complex and requires additional commands.
The `dora run` command does not support distributed dataflows. Instead, use the commands described in the following sections.

### Setup
To set up a distributed Dora network, you need a machine that is reachable by all machines that you want to use.
On this machine, spawn the `dora coordinator`, which is the central point of contact for all machines and the CLI.
If you like, you can adjust the port numbers that it listens on through command-line arguments.

After spawning the coordinator, spawn a `dora daemon` instance on all machines that should run parts of the dataflow.
Use the following command for this:

```
dora daemon --machine-id SOME_UNIQUE_ID --coordinator-addr 0.0.0.0
```

Each daemon instance needs to have a different `--machine-id` argument.
These machine IDs can later be referenced in dataflow configuration files to specify the target machine for each node.

Set the `--coordinator-addr` argument to the IP address of the `dora coordinator` instance.
If you chose different port numbers for the coordinator, you additionally need to specify a `--coordinator-port` argument.

### Distributed Build, Run, and Stop

Building a distributed dataflow uses the same `dora build` command as a local build.
The command will inspect the given dataflow specification file and look for `_unstable_deploy` keys in it.
If it finds any, it will do a distributed build instead of a local build.

A distributed build works by instructing the coordinator to send build commands to all connected daemons.
This way, each node is built directly on the machine where it will run later.
If the CLI and coordinator are running on different machines, you need to specify a `--coordinator-addr` argument:

```
dora start --coordinator-addr 0.0.0.0
```

You can also specify a `--coordinator-port` (if the coordinator listens on a non-default port).

To run a distributed dataflow, use the **`dora start`** command.
This command is very similar to `dora build`, but it goes to the coordinator instead of running dataflow directly.
Again, you need to specify the `--coordinator-addr` (and `--coordinator-port`) arguments.
Like `dora run`, you can pass `--uv` to spawn Python nodes through [`uv`](https://docs.astral.sh/uv/).

By default `dora start` will _attach_ to the started dataflow.
This means that the dataflow logs are printed to the terminal and that the dataflow is stopped on `ctrl-c`.
You can also use the `--detach` flag to let the dataflow run in background.

If you want to stop a dataflow, you can use the `dora stop` command.

#### Dismantle a Dora Network

The `dora destroy` command instructs the coordinator to stop all running dataflows, then tells all connected daemons to exit, and finally exits itself.
So it provides a way of stopping everything Dora-related.

#### Inspect

You can use the following commands to request information about distributed dataflows from the coordinator:

- use `list` to get a list of all running dataflow instances
- use `logs` to retrieve the log output of an active or finished dataflow run


## All Commands

{}

### `up`

{up}

### `new`

{new}

### `start`

{start}

### `list`

{list}

### `logs`

{logs}

### `check`

{check}

### `stop`

{stop}

### `destroy`

{destroy}

### `graph`

{graph}

### `--version`

```
Returns the current version of dora
```

This command will show the current version of dora.
