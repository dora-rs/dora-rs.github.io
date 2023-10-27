# Yolov5

## Making the video stream intelligent

Let's add a `yolov5` object detection operator, that you can [find as an example](https://raw.githubusercontent.com/dora-rs/dora/main/examples/python-operator-dataflow/object_detection.py). This will help us detect object as bounding boxes within the webcam stream.

1. Install required dependencies

    ```bash
    pip install -r https://raw.githubusercontent.com/dora-rs/dora/v0.2.6/examples/python-operator-dataflow/requirements.txt
    ```

2. Create a new `object_detection.py` python file with the following content

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
            dora_event: dict,
            send_output: Callable[[str, bytes | pa.Array, Optional[dict]], None],
        ) -> DoraStatus:
            if dora_event["type"] == "INPUT":
                return self.on_input(dora_event, send_output)
            return DoraStatus.CONTINUE

        def on_input(
            self,
            dora_input: dict,
            send_output: Callable[[str, bytes | pa.array, Optional[dict]], None],
        ) -> DoraStatus:
            """Handle image
            Args:
                dora_input (dict): Dict containing the "id", "value", and "metadata"
                send_output Callable[[str, bytes | pa.Array, Optional[dict]], None]:
                    Function for sending output to the dataflow:
                    - First argument is the `output_id`
                    - Second argument is the data as either bytes or `pa.Array`
                    - Third argument is dora metadata dict
                    e.g.: `send_output("bbox", pa.array([100], type=pa.uint8()), dora_event["metadata"])`
            """

            frame = dora_input["value"].to_numpy().reshape((CAMERA_HEIGHT, CAMERA_WIDTH, 3))
            frame = frame[:, :, ::-1]  # OpenCV image (BGR to RGB)
            results = self.model(frame)  # includes NMS
            arrays = pa.array(np.array(results.xyxy[0].cpu()).ravel())
            send_output("bbox", arrays, dora_input["metadata"])
            return DoraStatus.CONTINUE
    ```

    Operators are composed of:

    `on_event` methods is called when an event is received. 
    There is currently 4 event types:
    - `STOP`: meaning that the operator was signalled to stop.
    - `INPUT`: meannig that an input was received.
      - You can use `dora_event['id']`, to get the id. 
      - You can use `dora_event['data']`, to get the data as bytes. 
      - You can use `dora_event['value']`, to get the data as a zero-copy Uint8 arrow array. 
      - You can use `dora_event['meatadata']`, to get the metadata.
    - `INPUT_CLOSED`: meannig that an input source was closed. This could be useful if the input is critical for the well behaviour of the operator.
    - `ERROR`: meaning that error message was received.
    - `UNKNOWN`: meaning that an unknown message was received.


3. Add an operator within the dataflow

    ```yaml {10-16,23}
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

4. run

    ```bash
    dora up
    dora start dataflow.yml --attach
    ```
    <p align="center">
        <img src="/img/webcam_yolov5.png" width="800"/>
    </p>

    > For more information on `yolov5`, go on [our `yolov5` detail page](/docs/nodes_operators/yolov5_op)

    The plot will show object detected in the image as bounding box with a label and a confidence score.

