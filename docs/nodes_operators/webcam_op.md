


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
        self.video_capture = cv2.VideoCapture(0)
        self.video_capture.set(cv2.CAP_PROP_FRAME_WIDTH, OUTPUT_WIDTH)
        self.video_capture.set(cv2.CAP_PROP_FRAME_HEIGHT, OUTPUT_HEIGHT)


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



<details>
  <summary>Source Code</summary>

```python

    def on_input(
        self,
        dora_input: dict,
        send_output: Callable[[str, bytes], None],
    ):
        ret, frame = self.video_capture.read()
        if ret:
            frame = cv2.resize(frame, (OUTPUT_WIDTH, OUTPUT_HEIGHT))
            frame = cv2.cvtColor(frame, cv2.COLOR_BGR2BGRA)
            send_output(
                "image",
                pa.array(frame.ravel().view(np.uint8)),
                dora_input["metadata"],
            )
        else:
            print("could not get webcam.")
        return DoraStatus.CONTINUE


```

</details>




<!---
This file is auto-generated using:
node .scripts/generate-python-operator-doc.js
-->
