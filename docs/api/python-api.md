# Python API

<!---
This file is auto-generated using:
npm run update-python-api                  
-->


## Operator

The operator API is a framework for you to implement. The implemented operator will be managed by `dora`. This framework enable us to make optimisation and provide advanced features. It is the recommended way of using `dora`.

An operator requires an `on_event` method and requires to return a `DoraStatus` , depending of it needs to continue or stop.

```python
{{#include ../../examples/python-operator-dataflow/object_detection.py:0:25}}
```

> For Python, we recommend to allocate the operator on a single runtime. A runtime will share the same GIL with several operators making those operators run almost sequentially. See: [https://docs.rs/pyo3/latest/pyo3/marker/struct.Python.html#deadlocks](https://docs.rs/pyo3/latest/pyo3/marker/struct.Python.html#deadlocks)


## Custom Node

### `Node()`

The custom node API lets you integrate `dora` into your application.
It allows you to retrieve input and send output in any fashion you want.

Use with:

```python
from dora import Node

node = Node()
```


### `.next()`

`.next()` gives you the next input that the node has received.
It blocks until the next input becomes available.
It will return `None` when all senders has been dropped.

```python
input_id, value, metadata = node.next()
```

You can also iterate over the node in a loop

```python
for input_id, value, metadata in node:
```

### `.send_output(output_id, data, metadata)`

`send_output` send data from the node.

```python
Args:
   output_id: str,
   data: Bytes|Arrow,
   metadata: Option[Dict],
```

```python
node.send_output("string", b"string", {"open_telemetry_context": "7632e76"})
```


### `.__version__`

```
Returns the current version of dora python API.
```

This command will show the current version of cora.
