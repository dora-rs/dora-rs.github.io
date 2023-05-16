# Python API

<!---
This file is auto-generated using:
npm run update-python-api                  
-->


## Operator

The operator API is a framework for you to implement. The implemented operator will be managed by `dora`. This framework enable us to make optimisation and provide advanced features. It is the recommended way of using `dora`.

An operator requires an `on_event` method and requires to return a `DoraStatus` , depending of it needs to continue or stop.

### Example

```python
#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from typing import Callable

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
        dora_event: dict,
        send_output: Callable[[str, bytes], None],
    ) -> DoraStatus:
        """Handle image
        Args:
            dora_input (dict): Dict containing the "id", "data", and "metadata"
            send_output (Callable[[str, bytes]]): Function enabling sending output back to dora.
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

This command will show the current version of dora.
