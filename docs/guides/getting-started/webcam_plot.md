# Webcam Plot

This example will launch a webcam plot stream. 

1. Make sure to have a webcam and cv2 install via: `pip install numpy opencv-python pyarrow`

2. Download two pre-implemted operators from our repository

    ```bash
    wget https://raw.githubusercontent.com/dora-rs/dora/main/examples/python-operator-dataflow/webcam.py
    wget https://raw.githubusercontent.com/dora-rs/dora/main/examples/python-operator-dataflow/plot.py
    wget https://raw.githubusercontent.com/dora-rs/dora/main/examples/python-operator-dataflow/utils.py
    ```

3. Create a new `dataflow.yaml` file that will hold our dataflow definition:

    ```yaml
    nodes:
      - id: webcam
        operator:
          python: webcam.py
          inputs:
            tick: dora/timer/millis/100
          outputs:
            - image
      - id: plot
        operator:
          python: plot.py
          inputs:
            image: webcam/image 
    ```

    In this example, the webcam takes a tick input of frequency of 100 millis. It outputs the webcam image and dora forward it to a plot operator.

4. Start attached to the dataflow as follows:
    ```bash
    dora start dataflow.yaml --attach --hot-reload --name webcam
    ```

    > - `--attach`: enables you to wait for the dataflow to finish 
    > before returning.
    > - `--hot-reload`: enables you to modify Python Operator while the 
    > dataflow is running.
    > - `--name`: enables you to name a dataflow that might be simpler to use than the UUID.

5. You should see a small webcam window open up!

    <p align="center">
        <img src="/img/webcam.png" width="800"/>
    </p>

6. To stop your dataflow, you can use <kbd>ctrl</kbd>+<kbd>c</kbd>
