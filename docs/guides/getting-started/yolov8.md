---
sidebar_position: 3
---

# Yolov8

## Making the video stream intelligent

Let's add a `yolov8` object detection operator, that you can [find as an example](https://raw.githubusercontent.com/dora-rs/dora/v0.3.6/examples/python-operator-dataflow/object_detection.py). This will help us detect object as bounding boxes within the webcam stream.

1. Install required dependencies

   ```bash
   conda create -n example_env python=3.11
   conda activate test_env
   pip install -r https://raw.githubusercontent.com/dora-rs/dora/v0.3.6/examples/python-operator-dataflow/requirements.txt
   ```

2. Create a new `object_detection.py` python file with the following content

   ```bash
   wget https://raw.githubusercontent.com/dora-rs/dora/v0.3.6/examples/python-operator-dataflow/object_detection.py
   ```

   `object_detection.py`:

   ```python
   #!/usr/bin/env python3
   # -*- coding: utf-8 -*-

   import numpy as np
   import pyarrow as pa

   from dora import DoraStatus
   from ultralytics import YOLO

   pa.array([])

   CAMERA_WIDTH = 640
   CAMERA_HEIGHT = 480

   class Operator:
       def __init__(self):
           self.model = YOLO("yolov8n.pt")

       def on_event(
           self,
           dora_event,
           send_output,
       ) -> DoraStatus:
           if dora_event["type"] == "INPUT":
               return self.on_input(dora_event, send_output)
           return DoraStatus.CONTINUE

       def on_input(
           self,
           dora_input,
           send_output,
       ) -> DoraStatus:

           frame = dora_input["value"].to_numpy().reshape((CAMERA_HEIGHT, CAMERA_WIDTH, 3))
           frame = frame[:, :, ::-1]  # OpenCV image (BGR to RGB)
           results = self.model(frame)  # includes NMS
           # Process results
           boxes = np.array(results[0].boxes.xyxy.cpu())
           conf = np.array(results[0].boxes.conf.cpu())
           label = np.array(results[0].boxes.cls.cpu())
           # concatenate them together
           arrays = np.concatenate((boxes, conf[:, None], label[:, None]), axis=1)

           send_output("bbox", pa.array(arrays.ravel()), dora_input["metadata"])
           return DoraStatus.CONTINUE
   ```

   Operators are composed of:

   `on_event` methods is called when an event is received.
   There is currently 4 event types:

   - `STOP`: meaning that the operator was signalled to stop.
   - `INPUT`: meannig that an input was received.
     - You can use `dora_event['id']`, to get the id.
     - You can use `dora_event['data']`, to get the data as bytes.
     - You can use `dora_event['value']`, to get the data as arrow array.
     - You can use `dora_event['metadata']`, to get the metadata.
   - `INPUT_CLOSED`: meannig that an input source was closed. This could be useful if the input is critical for the well behaviour of the operator.
   - `ERROR`: meaning that error message was received.
   - `UNKNOWN`: meaning that an unknown message was received.

3. Add an operator within the dataflow

   ```bash
   wget https://raw.githubusercontent.com/dora-rs/dora/v0.3.6/examples/python-operator-dataflow/dataflow.yaml
   ```

   `dataflow.yaml`:

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

   In this case, we have connected the `webcam/image` output to the `image` input of yolov8. `object_detection/bbox` is then connected to the `plot/obstacles_bbox`.

   Inputs are prefixed by the node name to be able to separate name conflicts.

4. run

   ```bash
   dora up
   dora start dataflow.yml --attach
   ```

   <p align="center">
       <img src="/img/webcam_yolov5.png" width="800"/>
   </p>

   The plot will show object detected in the image as bounding box with a label and a confidence score.
