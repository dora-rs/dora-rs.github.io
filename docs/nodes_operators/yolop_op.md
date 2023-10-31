
 
# yolop operator

`yolop` recognizes lanes, and drivable area from a specific images.

More info here: [https://github.com/hustvl/YOLOP](https://github.com/hustvl/YOLOP)

You can also choose to allocate the model in GPU using the environment variable:
- `PYTORCH_DEVICE: cuda # or cpu`

## Inputs

- image: HEIGHT x WIDTH x BGR array.

## Outputs

- drivable_area: drivable area as contour points
- lanes: lanes as 60 points representing the lanes

## Example plot ( lanes in red, drivable area in green)

![Imgur](https://i.imgur.com/I531NIT.gif)

## Graph Description

```yaml
  - id: yolop
    operator: 
      outputs:
        - lanes
        - drivable_area
      inputs:
        image: webcam/image
      python: ../../operators/yolop_op.py
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
        self.model = torch.hub.load("hustvl/yolop", "yolop", pretrained=True)
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



<details>
  <summary>Source Code</summary>

```python

    def on_input(
        self,
        dora_input: dict,
        send_output: Callable[[str, bytes], None],
    ) -> DoraStatus:
        # inference
        frame = cv2.imdecode(
            np.frombuffer(
                dora_input["data"],
                np.uint8,
            ),
            -1,
        )

        frame = frame[:, :, :3]
        h0, w0, _ = frame.shape
        h, w = (640, 640)
        frame, _, (pad_w, pad_h) = letterbox_for_img(frame)
        ratio = w / w0
        pad_h, pad_w = (int(pad_h), int(pad_w))

        img = torch.unsqueeze(transform(frame), dim=0)
        half = False  # half precision only supported on CUDA
        img = img.half() if half else img.float()  # uint8 to fp16/32
        img = img.to(torch.device(DEVICE))
        det_out, da_seg_out, ll_seg_out = self.model(img)

        # det_out = [pred.reshape((1, -1, 6)) for pred in det_out]
        # inf_out = torch.cat(det_out, dim=1)

        # det_pred = non_max_suppression(
        # inf_out,
        # )
        # det = det_pred[0]

        da_predict = da_seg_out[:, :, pad_h : (h0 - pad_h), pad_w : (w0 - pad_w)]
        da_seg_mask = torch.nn.functional.interpolate(
            da_predict, scale_factor=1 / ratio, mode="bilinear"
        )
        _, da_seg_mask = torch.max(da_seg_mask, 1)
        da_seg_mask = da_seg_mask.int().squeeze().cpu().numpy()
        da_seg_mask = morphological_process(da_seg_mask, kernel_size=7)

        contours, _ = cv2.findContours(
            da_seg_mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE
        )
        if len(contours) != 0:
            contour = max(contours, key=cv2.contourArea)
            contour = contour.astype(np.int32)
            send_output("drivable_area", contour.tobytes(), dora_input["metadata"])
        else:
            send_output("drivable_area", np.array([]).tobytes(), dora_input["metadata"])

        ll_predict = ll_seg_out[:, :, pad_h : (h0 - pad_h), pad_w : (w0 - pad_w)]

        ll_seg_mask = torch.nn.functional.interpolate(
            ll_predict, scale_factor=1 / ratio, mode="bilinear"
        )

        _, ll_seg_mask = torch.max(ll_seg_mask, 1)
        ll_seg_mask = ll_seg_mask.int().squeeze().cpu().numpy()
        # Lane line post-processing
        ll_seg_mask = morphological_process(
            ll_seg_mask, kernel_size=7, func_type=cv2.MORPH_OPEN
        )
        ll_seg_points = np.array(connect_lane(ll_seg_mask), np.int32)
        send_output("lanes", ll_seg_points.tobytes(), dora_input["metadata"])
        return DoraStatus.CONTINUE


```

</details>




<!---
This file is auto-generated using:
node .scripts/generate-python-operator-doc.js
-->
