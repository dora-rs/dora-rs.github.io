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

{Node}

### `.next()`

{Node.next}

### `.send_output(output_id, data, metadata)`

{Node.send_output}

### `.__version__`

```
Returns the current version of dora python API.
```

This command will show the current version of dora.
