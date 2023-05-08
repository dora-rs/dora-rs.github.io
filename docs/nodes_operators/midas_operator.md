# MiDaS

MiDaS models for computing relative depth from a single image.

> MiDaS computes relative inverse depth from a single image. The repository provides multiple models that cover different use cases ranging from a small, high-speed model to a very large model that provide the highest accuracy. The models have been trained on 10 distinct datasets using multi-objective optimization to ensure high quality on a wide range of inputs.

### Installation:

To install midas offline:

```bash
cd $DORA_DEP_HOME/dependencies/
git clone git@github.com:isl-org/MiDaS.git
cd MiDaS/weights
# If you don't want to add manual download, the program will also automatically download the model file
wget https://github.com/isl-org/MiDaS/releases/download/v2_1/midas_v21_small_256.pt
cp midas_v21_small_256.pt $HOME/.cache/torch/hub/checkpoints/
```

Add the following dataflow configuration 
```yaml
  - id: midas_op
    operator:
      outputs:
        - depth_frame
      inputs:
        image: webcam/image
      python: ../../operators/midas_op.py
    env:
      PYTORCH_DEVICE: "cuda"
      MIDAS_PATH: $DORA_DEP_HOME/dependencies/MiDaS/
      MIDAS_WEIGHT_PATH: $DORA_DEP_HOME/dependencies/MiDaS/weights/midas_v21_small_256.pt
      MODEL_TYPE: "MiDaS_small"
      MODEL_NAME: "MiDaS_small"
```
> - model_type = "DPT_Large"     # MiDaS v3 - Large     (highest accuracy, slowest inference speed)
> - model_type = "DPT_Hybrid"   # MiDaS v3 - Hybrid    (medium accuracy, medium inference speed)
> - model_type = "MiDaS_small"  # MiDaS v2.1 - Small   (lowest accuracy, highest inference speed)
