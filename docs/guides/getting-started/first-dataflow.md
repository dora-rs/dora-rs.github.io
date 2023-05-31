# Getting started

1. Install `dora` binaries from GitHub releases
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
3. Start `dora-coordinator` and a `dora-deamon`
    ```bash
    dora up
    ```
4. Start your dataflow
    ```bash
    dora start dataflow.yml
    # Output: c95d118b-cded-4531-a0e4-cd85b7c3916c
    ```
    The output is the unique ID of the dataflow instance, which can be used to control it through the `dora` CLI.

5. You will see in your `dora-coordinator` window operators receiving ticks.
    ```bash
    Received input tick, with data: b''
    Received input tick, with data: b''
    Received input tick, with data: b''
    ...
    ```
6. Stop your dataflow
    ```bash
    dora stop c95d118b-cded-4531-a0e4-cd85b7c3916c
    ```
    (Pass the ID returned by `dora start` here.)

7. You can then add or modify operators or nodes. For adding nodes easily, you can use the `dora` CLI again:

   - Run `dora new --kind operator --lang rust <name>` to create a new Rust operator named `<name>`.
   - Run `dora new --kind custom-node --lang rust <name>` to create a new custom node named `<name>`.

    You need to add the created operators/nodes to your dataflow YAML file.
