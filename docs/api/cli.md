<!---
This file is auto-generated using:
npm run update-cli
-->

## Overview

```
dora-rs cli client

Usage: dora <COMMAND>

Commands:
  check        Check if the coordinator and the daemon is running
  graph        Generate a visualization of the given graph using mermaid.js. Use --open to open
                   browser
  build        Run build commands provided in the given dataflow
  new          Generate a new project or node. Choose the language between Rust, Python, C or
                   C++
  up           Spawn coordinator and daemon in local mode (with default config)
  destroy      Destroy running coordinator and daemon. If some dataflows are still running, they
                   will be stopped first
  start        Start the given dataflow path. Attach a name to the running dataflow by using
                   --name
  stop         Stop the given dataflow UUID. If no id is provided, you will be able to choose
                   between the running dataflows
  list         List running dataflows
  logs         Show logs of a given dataflow and node
  daemon       Run daemon
  runtime      Run runtime
  coordinator  Run coordinator
  help         Print this message or the help of the given subcommand(s)

Options:
  -h, --help     Print help
  -V, --version  Print version
```

## `up`

```
Spawn coordinator and daemon in local mode (with default config)

Usage: dora up

Options:
  -h, --help  Print help
```

## `new`

```
Generate a new project or node. Choose the language between Rust, Python, C or C++

Usage: dora new [OPTIONS] <NAME>

Arguments:
  <NAME>  Desired name of the entity

Options:
      --kind <KIND>  The entity that should be created [default: dataflow] [possible values:
                     dataflow, custom-node]
      --lang <LANG>  The programming language that should be used [default: rust] [possible values:
                     rust, python, c, cxx]
  -h, --help         Print help
```

## `start`

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
      --hot-reload               Enable hot reloading (Python only)
  -h, --help                     Print help
```

## `list`

```
List running dataflows

Usage: dora list [OPTIONS]

Options:
      --coordinator-addr <IP>    Address of the dora coordinator [default: 127.0.0.1]
      --coordinator-port <PORT>  Port number of the coordinator control server [default: 6012]
  -h, --help                     Print help
```

## `logs`

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

## `check`

```
Check if the coordinator and the daemon is running

Usage: dora check [OPTIONS]

Options:
      --dataflow <PATH>          Path to the dataflow descriptor file (enables additional checks)
      --coordinator-addr <IP>    Address of the dora coordinator [default: 127.0.0.1]
      --coordinator-port <PORT>  Port number of the coordinator control server [default: 6012]
  -h, --help                     Print help
```

## `stop`

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

## `destroy`

```
Destroy running coordinator and daemon. If some dataflows are still running, they will be stopped
first

Usage: dora destroy [OPTIONS]

Options:
      --coordinator-addr <IP>    Address of the dora coordinator [default: 127.0.0.1]
      --coordinator-port <PORT>  Port number of the coordinator control server [default: 6012]
  -h, --help                     Print help
```

## `graph`

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

## `--version`

```
Returns the current version of dora
```

This command will show the current version of dora.
