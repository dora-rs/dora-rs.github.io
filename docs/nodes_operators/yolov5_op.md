
 
# Yolov5 operator

`Yolov5` object detection operator generates bounding boxes on images where it detects object. 

More info here: [https://github.com/ultralytics/yolov5](https://github.com/ultralytics/yolov5)

`Yolov5` has not been finetuned on the simulation and is directly importing weight from Pytorch Hub.

In case you want to run `yolov5` without internet you can clone [https://github.com/ultralytics/yolov5](https://github.com/ultralytics/yolov5) and download the weights you want to use from [the release page](https://github.com/ultralytics/yolov5/releases/tag/v7.0) and then specify within the yaml graph the two environments variables:
- `YOLOV5_PATH: YOUR/PATH` 
- `YOLOV5_WEIGHT_PATH: YOUR/WEIGHT/PATH`

You can also choose to allocate the model in GPU using the environment variable:
- `PYTORCH_DEVICE: cuda # or cpu`

## Inputs

- image: HEIGHT x WIDTH x BGR array.

## Outputs

- bbox: N_BBOX, X_MIN, X_MAX, Y_MIN, Y_MAX, CONDIDENCE, CLASS, array

## Example Image

![yolov5 example](https://i.imgur.com/hPrazyl.jpg)

## Graph Description

```yaml
  - id: yolov5
    operator: 
      outputs:
        - bbox
      inputs:
        image: webcam/image
      python: ../../operators/yolov5_op.py
```

## Graph Visualisation

```mermaid
        flowchart TB
  oasis_agent
subgraph yolov5
  yolov5/op[op]
end
subgraph obstacle_location_op
  obstacle_location_op/op[op]
end
  oasis_agent -- image --> yolov5/op
  yolov5/op -- bbox as obstacles_bbox --> obstacle_location_op/op
```


<!---
This file is auto-generated using:
node .scripts/generate-python-operator-doc.js
-->

## Methods

### `__init__()`



<details>
  <summary>Source Code</summary>

```python
    def __init__(self):
        if YOLOV5_PATH is None:
            # With internet
            self.model = torch.hub.load(
                "ultralytics/yolov5",
                "yolov5n",
            )
        else:
            # Without internet
            #
            # To install:
            # cd $DORA_HOME_DEP/dependecies # Optional
            # git clone https://github.com/ultralytics/yolov5.git
            # rm yolov5/.git -rf
            # Add YOLOV5_PATH and YOLOV5_WEIGHT_PATH in your YAML graph

            self.model = torch.hub.load(
                YOLOV5_PATH,
                "custom",
                path=YOLOV5_WEIGHT_PATH,
                source="local",
            )

        self.model.to(torch.device(DEVICE))
        self.model.eval()


```

</details>

### `.on_event(...)`



<details>
  <summary>Source Code</summary>

```python

    def on_event(
        self,
        dora_event: dict,
        send_output: Callable[[str, bytes], None],
    ) -> DoraStatus:
        if dora_event["type"] == "INPUT":
            return self.on_input(dora_event, send_output)
        return DoraStatus.CONTINUE


```

</details>


### `.on_input(...)`


        Handle image
        Args:
            dora_input["id"] (str): Id of the input declared in the yaml configuration
            dora_input["value"] (arrow.array (UInt8)): Bytes message of the input
            send_output (Callable[[str, bytes]]): Function enabling sending output back to dora.
        

<details>
  <summary>Source Code</summary>

```python

    def on_input(
        self,
        dora_input: dict,
        send_output: Callable[[str, bytes], None],
    ) -> DoraStatus:
        """
        Handle image
        Args:
            dora_input["id"] (str): Id of the input declared in the yaml configuration
            dora_input["value"] (arrow.array (UInt8)): Bytes message of the input
            send_output (Callable[[str, bytes]]): Function enabling sending output back to dora.
        """
        if dora_input["id"] == "image":
            frame = (
                dora_input["value"].to_numpy().reshape((IMAGE_HEIGHT, IMAGE_WIDTH, 4))
            )
            frame = frame[:, :, :3]

            results = self.model(frame)  # includes NMS
            arrays = np.array(results.xyxy[0].cpu())[
                :, [0, 2, 1, 3, 4, 5]
            ]  # xyxy -> xxyy
            arrays[:, 4] *= 100
            arrays = arrays.astype(np.int32)
            arrays = pa.array(arrays.ravel())
            send_output("bbox", arrays, dora_input["metadata"])
            return DoraStatus.CONTINUE


```

</details>




<!---
This file is auto-generated using:
node .scripts/generate-python-operator-doc.js
-->
