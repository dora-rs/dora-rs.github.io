# Dynamic Node

Run node by calling python, jupyter or cargo. All you have to do is specify that the node is dynamic in the dataflow and specify the node id within the node code and you will be able to run the node natively without using `dora start`.

## Getting Started

You can try this mininal one node example:

```yaml
nodes:
  - id: node_0
    path: dynamic # <-- We need to define the path: dynamic for dynamic node
    inputs:
      tick: dora/timer/millis/50
```

- By copying this dataflow on your computer, you can paste the following in your terminal:

```bash
echo -e "nodes:\n  - id: node_0\n    path: dynamic\n    inputs:\n      tick: dora/timer/millis/50" > dataflow.yaml
```

- Then starting the dataflow

```bash
dora start dataflow.yaml
```

- Then using one of the following method to start the node:

### Using interactive python:

```python
$ python
>>> from dora import Node
>>> node = Node("node_0")
>>> event = node.next()
>>> event
{'id': 'tick', 'type': 'INPUT', 'value': <pyarrow.lib.NullArray object at 0x7bda86924460>
0 nulls, 'kind': 'dora', 'metadata': {'open_telemetry_context': ''}}
```

### Using Python

```bash
$ python my_script.py # <-- node = Node("node_0")
# Log will appear in your terminal
```

### Using Rust

```bash
$ cargo run my_node # <-- DoraNode::init_from_node_id(node_id);
# Log will appear in your terminal
```

### Using a jupyter notebook

![python](https://raw.githubusercontent.com/dora-rs/dora-rs.github.io/833f06023329439f5c7d4b6b610c080135d6d09e/static/img/jupyter.png)
