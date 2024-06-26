# Dynamic Node

Dynamic node aims to make dora development simpler by just using default python or cargo to run a node.

## Getting Started

Let's imagine this one node example:

```yaml
nodes:
  - id: node_0
    path: dynamic # <-- We need to define the path: dynamic for dynamic node
    inputs:
      tick: dora/timer/millis/50
```

You can paste the following in your terminal

```bash
echo "nodes:\n  - id: node_0\n    path: dynamic\n    inputs:\n      tick: dora/timer/millis/50" > dataflow.yml
```

You can use python to access it in your terminal:

```python
>>> python3

>>> from dora import Node

>>> node = Node("node_0") # <-- Note that you need to specify the node id.

>>> event = node.next()

>>> print(event)
# {'metadata': {'open_telemetry_context': ''}, 'value': <pyarrow.lib.NullArray object at 0x738bbcb28460>
# 0 nulls, 'id': 'tick', 'type': 'INPUT', 'kind': 'dora'}
```

You can use it in your Jupyter Notebook:

<img src="/img/jupyter.png"/>

## Getting started Rust

You can also just use rust with

```bash
cargo run -p my_node
```

### Exit behaviour

Exiting will not close the node.
