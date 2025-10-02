---
sidebar_position: 0
---

# Basic Concepts

## Nodes & Dataflow

DORA (Dataflow-Oriented Robotic Architecture) defines a dataflow by writing a YAML file like this:

```yml
nodes:
  - id: hello_dora
    build: pip install -e .
    path: dora-helloworld
    inputs:
      tick: dora/timer/millis/20
    outputs:
      - hello
  - id: hello_dora_2
    build: pip install dora-hello
    path: dora-hello
    args: --name="World"
    inputs:
      hello: hello_dora/hello
```

It describes a node by specifying its inputs and outputs, along with some other properties.

Each node is actually a Python package, with a main entry script that will be executed when the node is started.

A dataflow is actually an instance of a dataflow definition (the YAML file). You can start multiple dataflows from the same definition if you want. Each dataflow will be assigned a unique ID, which can be used to manage the dataflow.

```sh
$ dora run hello.yml
dataflow start triggered: 0197a739-cb05-70b7-9714-f46476ebd16c
```

This ID can be hard to remember, so specifying a name for the dataflow is a good idea. You can do this by adding

```bash
dora run hello.yml --name my_hello_dataflow
```

## Coordinator & Daemon

The dataflow itself cannot be executed directly. Instead, it needs the daemon to help start the nodes, and the coordinator to manage the dataflow.

> Sometimes the nodes in the same dataflow may exist in different machines, each machine will run a daemon, and the coordinator will be responsible for managing the dataflow (and of course, the nodes) across these daemons.

Running a dataflow requires a coordinator to be running already. If you don’t have one, no worries – simply use the `dora run` command (similar to docker run). This will start a coordinator (if one isn’t already running) and then run the dataflow for you:

```bash
dora run my_dataflow.yml
```

Also, you might want to start the coordinator manually. In that case, you can use the `dora coordinator start` command.

Then, you can run the dataflow with the `dora run` command as before. DORA also provides some other commands to manage the coordinator, such as `dora coordinator stop`, `dora coordinator status`, etc.

Similarly, you can manage the daemon with the `dora daemon` command.
