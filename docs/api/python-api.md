# Python API

<!---
This file is auto-generated using:
npm run update-python-api
-->

## Operator

The operator API is a framework for you to implement. The implemented operator will be managed by `dora`. This framework enable us to make optimisation and provide advanced features. It is the recommended way of using `dora`.

An operator requires an `on_event` method and requires to return a `DoraStatus` , depending of it needs to continue or stop.

### Events

There is currently 4 event types that the on_event method receives:

- `STOP`: meaning that the operator was signalled to stop.
- `INPUT`: meannig that an input was received.
  - You can use `dora_event['id']`, to get the id.
  - You can use `dora_event['data']`, to get the data as bytes.
  - You can use `dora_event['value']`, to get the data as a zero-copy Uint8 arrow array.
  - You can use `dora_event['metadata']`, to get the metadata.
- `INPUT_CLOSED`: meannig that an input source was closed. This could be useful if the input is critical for the well behaviour of the operator.
- `ERROR`: meaning that error message was received.
- `UNKNOWN`: meaning that an unknown message was received.

### `send_output`

To send an output from the operator, use `send_output: Callable[[str, bytes | pa.Array, dict], None]` input method:

- the first argument is the `output_id` as defined in your dataflow.
- the second argument is the data as either bytes or pyarrow.Array for zero copy.
- the third argument is dora metadata if you want ot link the tracing from one input into an output.
  `e.g.:  send_output("bbox", pa.array([100], type=pa.uint8()), dora_event["metadata"])`

### Example

```python
#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from typing import Callable, Optional

import cv2
import numpy as np
import pyarrow as pa
import torch

from dora import DoraStatus

pa.array([])

CAMERA_WIDTH = 640
CAMERA_HEIGHT = 480


class Operator:
    """
    Infering object from images
    """

    def __init__(self):
        self.model = torch.hub.load("ultralytics/yolov5", "yolov5n")

    def on_event(
        self,
        dora_event,
        send_output,
    ) -> DoraStatus:
        """Handle image
        Args:
            dora_input (dict) containing the "id", "data", and "metadata"
            send_output Callable[[str, bytes | pa.Array, Optional[dict]], None]:
                Function for sending output to the dataflow:
                - First argument is the `output_id`
                - Second argument is the data as either bytes or `pa.Array`
                - Third argument is dora metadata dict
                e.g.: `send_output("bbox", pa.array([100], type=pa.uint8()), dora_event["metadata"])`
        """
        if dora_event["type"] == "INPUT":
            frame = (
                dora_event["value"]
                .to_numpy()
                .reshape((CAMERA_HEIGHT, CAMERA_WIDTH, 3))
            )
            frame = frame[:, :, ::-1]  # OpenCV image (BGR to RGB)
            results = self.model(frame)  # includes NMS
            arrays = pa.array(
                np.array(results.xyxy[0].cpu()).ravel().view(np.uint8)
            )
            send_output("bbox", arrays, dora_event["metadata"])
            return DoraStatus.CONTINUE
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
It blocks until the next event becomes available.
It will return `None` when all senders has been dropped.

```python
event = node.next()
```

You can also iterate over the event stream with a loop

```python
for event in node:
   match event["type"]:
       case "INPUT":
           match event["id"]:
                case "image":
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

### `.dataflow_descriptor()`

Returns the full dataflow descriptor that this node is part of.

This method returns the parsed dataflow YAML file.

### `.__version__`

```
Returns the current version of dora python API.
```

This command will show the current version of dora.
