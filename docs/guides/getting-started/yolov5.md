# Yolov5

## Making the video stream intelligent

Let's add a `yolov5` object detection operator, that you can [find as an example](https://raw.githubusercontent.com/dora-rs/dora/main/examples/python-operator-dataflow/object_detection.py). This will help us detect object as bounding boxes within the webcam stream.

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

Operators are composed of:

- `__init__` methods that help create the object.

- `on_event` methods that is called when an event is received.

  There is currently 4 event types:
  - `STOP`: meaning that the operator was signalled to stop.
  - `INPUT`: meannig that an input was received.
    - You can use `dora_event['id']`, to get the id.
    - You can use `dora_event['data']`, to get the data.
  - You can use `dora_event['meatadata']`, to get the metadata.
- `INPUT_CLOSED`: meannig that an input source was closed. This could be useful if the input is critical for the well behaviour of the operator.
- `ERROR`: meaning that error message was received.
- `UNKNOWN`: meaning that an unknown message was received.

We have encapsulated `input` event in a `on_input` method but this is not required.

To add an operator within the dataflow. You need to explicit what the input and output are. You can reference node by their ids:

```yaml {10-16}
nodes:
  - id: webcam
    operator:
      python: webcam.py
      inputs:
        tick: dora/timer/millis/100
      outputs:
        - image

  - id: object_detection
    operator:
      python: object_detection.py
      inputs:
        image: webcam/image
      outputs:
        - bbox

  - id: plot
    operator:
      python: plot.py
      inputs:
        image: webcam/image
        bbox: object_detection/bbox
```

In this case, we have connected the `webcam/image` output to the `image` input of yolov5. `yolov5/bbox` is then connected to the `plot/obstacles_bbox`.

Inputs are prefixed by the node name to be able to separate name conflicts.

To run: 

```bash
dora up
dora start graphs/tutorials/webcam_yolov5.yaml --attach
```
<p align="center">
    <img src="/img/webcam_yolov5.png" width="800"/>
</p>

> For more information on `yolov5`, go on [our `yolov5` detail page](/docs/nodes_operators/yolov5_op)