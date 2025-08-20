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

```
dora-rs cli client

Usage: dora <COMMAND>

Commands:
  check        Check if the coordinator and the daemon is running
  graph        Generate a visualization of the given graph using mermaid.js. Use --open to open
               browser
  build        Run build commands provided in the given dataflow
  new          Generate a new project or node. Choose the language between Rust, Python, C or C++
  run          Run a dataflow locally
  up           Spawn coordinator and daemon in local mode (with default config)
  destroy      Destroy running coordinator and daemon. If some dataflows are still running, they
               will be stopped first
  start        Start the given dataflow path. Attach a name to the running dataflow by using --name
  stop         Stop the given dataflow UUID. If no id is provided, you will be able to choose
               between the running dataflows
  list         List running dataflows
  logs         Show logs of a given dataflow and node
  daemon       Run daemon
  runtime      Run runtime
  coordinator  Run coordinator
  self         Dora CLI self-management commands
  help         Print this message or the help of the given subcommand(s)

Options:
  -h, --help     Print help
  -V, --version  Print version
```

### `up`

```
Spawn coordinator and daemon in local mode (with default config)

Usage: dora up

Options:
  -h, --help  Print help
```

### `new`

```
Generate a new project or node. Choose the language between Rust, Python, C or C++

Usage: dora new [OPTIONS] <NAME>

Arguments:
  <NAME>  Desired name of the entity

Options:
      --kind <KIND>  The entity that should be created [default: dataflow] [possible values:
                     dataflow, node]
      --lang <LANG>  The programming language that should be used [default: rust] [possible values:
                     rust, python, c, cxx]
  -h, --help         Print help
```

### `start`

```
Start the given dataflow path. Attach a name to the running dataflow by using --name

Usage: dora start [OPTIONS] <PATH>

Arguments:
  <PATH>  Path to the dataflow descriptor file

Options:
      --name <NAME>              Assign a name to the dataflow
      --coordinator-addr <IP>    Address of the dora coordinator [default: 127.0.0.1]
      --coordinator-port <PORT>  Port number of the coordinator control server [default: 6012]
      --attach                   Attach to the dataflow and wait for its completion
      --detach                   Run the dataflow in background
      --hot-reload               Enable hot reloading (Python only)
      --uv                       
  -h, --help                     Print help
```

### `list`

```
List running dataflows

Usage: dora list [OPTIONS]

Options:
      --coordinator-addr <IP>    Address of the dora coordinator [default: 127.0.0.1]
      --coordinator-port <PORT>  Port number of the coordinator control server [default: 6012]
  -h, --help                     Print help
```

### `logs`

```
Show logs of a given dataflow and node

Usage: dora logs [OPTIONS] [UUID_OR_NAME] <NAME>

Arguments:
  [UUID_OR_NAME]  Identifier of the dataflow
  <NAME>          Show logs for the given node

Options:
      --coordinator-addr <IP>    Address of the dora coordinator [default: 127.0.0.1]
      --coordinator-port <PORT>  Port number of the coordinator control server [default: 6012]
  -h, --help                     Print help
```

### `check`

```
Check if the coordinator and the daemon is running

Usage: dora check [OPTIONS]

Options:
      --dataflow <PATH>          Path to the dataflow descriptor file (enables additional checks)
      --coordinator-addr <IP>    Address of the dora coordinator [default: 127.0.0.1]
      --coordinator-port <PORT>  Port number of the coordinator control server [default: 6012]
  -h, --help                     Print help
```

### `stop`

```
Stop the given dataflow UUID. If no id is provided, you will be able to choose between the running
dataflows

Usage: dora stop [OPTIONS] [UUID]

Arguments:
  [UUID]  UUID of the dataflow that should be stopped

Options:
      --name <NAME>                Name of the dataflow that should be stopped
      --grace-duration <DURATION>  Kill the dataflow if it doesn't stop after the given duration
      --coordinator-addr <IP>      Address of the dora coordinator [default: 127.0.0.1]
      --coordinator-port <PORT>    Port number of the coordinator control server [default: 6012]
  -h, --help                       Print help
```

### `destroy`

```
Destroy running coordinator and daemon. If some dataflows are still running, they will be stopped
first

Usage: dora destroy [OPTIONS]

Options:
      --coordinator-addr <IP>    Address of the dora coordinator [default: 127.0.0.1]
      --coordinator-port <PORT>  Port number of the coordinator control server [default: 6012]
  -h, --help                     Print help
```

### `graph`

```
Generate a visualization of the given graph using mermaid.js. Use --open to open browser

Usage: dora graph [OPTIONS] <PATH>

Arguments:
  <PATH>  Path to the dataflow descriptor file

Options:
      --mermaid  Visualize the dataflow as a Mermaid diagram (instead of HTML)
      --open     Open the HTML visualization in the browser
  -h, --help     Print help
```

### `--version`

```
Returns the current version of dora
```

This command will show the current version of dora.
