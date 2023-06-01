# Getting started

1. Install `dora` binaries using our [installation page](/docs/guides/Installation/installing)

2. Create a new dataflow

```bash
dora new abc_project --lang python
cd abc_project
```

This creates the following `abc_project` directory
```bash
.
├── dataflow.yml
├── node_1
│   └── node_1.py
├── op_1
│   └── op_1.py
└── op_2
    └── op_2.py
```

1. Start `dora-coordinator` and a `dora-deamon`
```bash
dora up 
```

1. Start your dataflow
```bash
dora start dataflow.yml
# Output: c95d118b-cded-4531-a0e4-cd85b7c3916c
```
The output is a randomly generated unique ID of the dataflow instance, which can be used to control it through the `dora` CLI. You can use `--name ` option to set a specific name for your dataflow.

1. You will see in your `dora-coordinator` window operators receiving ticks.
```bash
Received input tick, with data: b''
Received input tick, with data: b''
Received input tick, with data: b''
...
```

1. Stop your dataflow
```bash
dora stop c95d118b-cded-4531-a0e4-cd85b7c3916c
```
(Pass the ID returned by `dora start` here.)

1. You can then add or modify operators or nodes. For adding nodes easily, you can use the `dora` CLI again:

- Run `dora new --kind operator --lang rust <name>` to create a new Rust operator named `<name>`.
- Run `dora new --kind custom-node --lang rust <name>` to create a new custom node named `<name>`.

You need to add the created operators/nodes to your dataflow YAML file.