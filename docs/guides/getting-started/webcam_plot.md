# Webcam Plot

1. Download already implemented operators by putting links in the dataflow. This example will launch a webcam plot stream. 

```yaml
nodes:
  - id: webcam
    operator:
      python: https://raw.githubusercontent.com/dora-rs/dora/main/examples/python-operator-dataflow/webcam.py
      inputs:
        tick: dora/timer/millis/100
      outputs:
        - image
  - id: plot
    operator:
      python: https://raw.githubusercontent.com/dora-rs/dora/main/examples/python-operator-dataflow/plot.py
      inputs:
        image: webcam/image 
```
> Make sure to have a webcam and cv2 install via: `pip install opencv-python`

2. You can start attached to the dataflow as follows:
```bash
conda activate dora3.7
dora start graphs/tutorials/webcam.yaml --attach --hot-reload --name webcam
```

> `--attach`: enables you to wait for the dataflow to finish 
> before returning.
> 
> `--hot-reload`: enables you to modify Python Operator while the 
> dataflow is running.
>
> `--name`: enables you to name a dataflow that might be simpler to use than the UUID.

3. You should see a small webcam open up!
> Make sure to have a webcam and cv2 install via: `pip install opencv-python`

<p align="center">
    <img src="/img/webcam.png" width="800"/>
</p>

4. To stop your dataflow, you can use <kbd>ctrl</kbd>+<kbd>c</kbd>
