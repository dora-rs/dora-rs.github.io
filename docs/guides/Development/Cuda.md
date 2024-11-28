# CUDA 0-Copy IPC

So let say you have a pytorch tensor on cuda and you want to share it between nodes.

Good news is that you can do it without copying the data using CUDA 0 Copy IPC.

## Installation

To use this feature, make sure to have the following requirements:

```bash

# Install pyarrow with gpu support
conda install pyarrow "arrow-cpp-proc=*=cuda" -c conda-forge

## Test installation with
python -c "import pyarrow.cuda"

# Install numba for translation from arrow to torch
pip install numba

## Test installation with
python -c "import numba.cuda"

# Install torch if it's not already present
pip install torch

## Test installation with
python -c "import torch; assert torch.cuda.is_available()"
```

## Sending data

To create an IPC handle that is going to be sent between process, do the following:

```python
import torch
from dora.cuda import torch_to_ipc_buffer

torch_tensor = torch.tensor([1, 2, 3], dtype=torch.int64, device="cuda")
ipc_buffer, metadata = torch_to_ipc_buffer(torch_tensor)
node.send_output("latency", ipc_buffer, metadata)
```

## Receiving data

```python
import pyarrow as pa
from dora import Node
from dora.cuda import ipc_buffer_to_ipc_handle, cudabuffer_to_torch

ctx = pa.cuda.context()
node = Node()
event = node.next() # Get an event with a torch handle

ipc_handle = ipc_buffer_to_ipc_handle(event["value"])
cudabuffer = ctx.open_ipc_buffer(ipc_handle)
torch_tensor = cudabuffer_to_torch(cudabuffer, event["metadata"])  # on cuda
```
