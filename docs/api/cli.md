<!---
This file is auto-generated using:
npm run update-cli
-->

## Overview

```
dora-rs cli client

Usage: dora-cli <COMMAND>

Commands:
  check    Check if the coordinator and the daemon is running
  graph    Generate a visualization of the given graph using mermaid.js. Use --open to open
               browser
  build    Run build commands provided in the given dataflow
  new      Generate a new project, node or operator. Choose the language between Rust, Python, C
               or C++
  up       Spawn a coordinator and a daemon
  destroy  Destroy running coordinator and daemon. If some dataflows are still running, they
               will be stopped first
  start    Start the given dataflow path. Attach a name to the running dataflow by using --name
  stop     Stop the given dataflow UUID. If no id is provided, you will be able to choose
               between the running dataflows
  list     List running dataflows
  logs     Show logs of a given dataflow and node
  help     Print this message or the help of the given subcommand(s)

Options:
  -h, --help     Print help
  -V, --version  Print version
```

## `up`

```
Spawn a coordinator and a daemon

Usage: dora-cli up [OPTIONS]

Options:
      --config <CONFIG>                      
      --coordinator-path <COORDINATOR_PATH>  
      --daemon-path <DAEMON_PATH>            
  -h, --help                                 Print help
```

## `new`

```
Generate a new project, node or operator. Choose the language between Rust, Python, C or C++

Usage: dora-cli new [OPTIONS] <NAME> [PATH]

Arguments:
  <NAME>  
  [PATH]  

Options:
      --kind <KIND>  [default: dataflow] [possible values: dataflow, operator, custom-node]
      --lang <LANG>  [default: rust] [possible values: rust, python, c, cxx]
  -h, --help         Print help
```

## `start`

```
Start the given dataflow path. Attach a name to the running dataflow by using --name

Usage: dora-cli start [OPTIONS] <DATAFLOW>

Arguments:
  <DATAFLOW>  

Options:
      --name <NAME>  
      --attach       
      --hot-reload   
  -h, --help         Print help
```

## `list`

```
List running dataflows

Usage: dora-cli list

Options:
  -h, --help  Print help
```

## `logs`

```
Show logs of a given dataflow and node

Usage: dora-cli logs <DATAFLOW> <NODE>

Arguments:
  <DATAFLOW>  
  <NODE>      

Options:
  -h, --help  Print help
```

## `check`

```
Check if the coordinator and the daemon is running

Usage: dora-cli check [OPTIONS]

Options:
      --dataflow <DATAFLOW>  
  -h, --help                 Print help
```

## `stop`

```
Stop the given dataflow UUID. If no id is provided, you will be able to choose between the running
dataflows

Usage: dora-cli stop [OPTIONS] [UUID]

Arguments:
  [UUID]  

Options:
      --name <NAME>  
  -h, --help         Print help
```

## `destroy`

```
Destroy running coordinator and daemon. If some dataflows are still running, they will be stopped
first

Usage: dora-cli destroy [OPTIONS]

Options:
      --config <CONFIG>  
  -h, --help             Print help
```

## `graph`

```
Generate a visualization of the given graph using mermaid.js. Use --open to open browser

Usage: dora-cli graph [OPTIONS] <DATAFLOW>

Arguments:
  <DATAFLOW>  

Options:
      --mermaid  
      --open     
  -h, --help     Print help
```

## `--version`

```
Returns the current version of dora
```

This command will show the current version of dora.
