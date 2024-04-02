---
sidebar_position: 3
---

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

3. Start `dora-coordinator` and a `dora-deamon`
   ```bash
   dora up
   ```
4. Start your dataflow

   ```bash
   dora start dataflow.yml --name first-dataflow
   # Output: c95d118b-cded-4531-a0e4-cd85b7c3916c
   ```

   The output is a randomly generated unique ID of the dataflow instance, which can be used to control it through the `dora` CLI. You can use `--name ` option to set a specific name for your dataflow.

5. You can check the logs with:
   ```bash
   dora logs custom-node_1
   ```
   In this example, the output is going to be:
   ```bash
   Node received:
       id: tick,
       value: 0 nulls,
       metadata: {'open_telemetry_context': ''}
   ```
6. Stop your dataflow

   ```bash
   dora stop --name first-dataflow
   ```

   (Pass the ID or name returned by `dora start` here.)

7. You can then add or modify operators or nodes. For adding nodes easily, you can use the `dora` CLI again:

   - Run `dora new --kind operator --lang rust <name>` to create a new Rust operator named `<name>`.
   - Run `dora new --kind custom-node --lang rust <name>` to create a new custom node named `<name>`.

   You need to add the created operators/nodes to your dataflow YAML file.

---

## Video Tutorial

 <iframe width="560" height="315" src="https://www.youtube.com/embed/uOO1NtzI6bA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

 <iframe width="560" height="315" src="https://www.youtube.com/embed/_QLvFUyDKYc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
