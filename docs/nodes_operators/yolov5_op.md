# Yolov5 Operator

<!---
This file is auto-generated using:
node .scripts/generate-python-operator-doc.js
-->

```

    Send `bbox` found by YOLOv5 on given `image`
    
```

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
            dora_input["id"](str): Id of the input declared in the yaml configuration
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
            dora_input["id"](str): Id of the input declared in the yaml configuration
            dora_input["value"] (arrow.array (UInt8)): Bytes message of the input
            send_output (Callable[[str, bytes]]): Function enabling sending output back to dora.
        """
        if dora_input["id"] == "image":
            frame = (
                dora_input["value"]
                .to_numpy()
                .reshape((IMAGE_HEIGHT, IMAGE_WIDTH, 4))
            )
            frame = frame[:, :, :3]

            results = self.model(frame)  # includes NMS
            arrays = np.array(results.xyxy[0].cpu())[
                :, [0, 2, 1, 3, 4, 5]
            ]  # xyxy -> xxyy
            arrays[:, 4] *= 100
            arrays = arrays.astype(np.int32)
            arrays = pa.array(arrays.ravel().view(np.uint8))
            send_output("bbox", arrays, dora_input["metadata"])
            return DoraStatus.CONTINUE


```

</details>


