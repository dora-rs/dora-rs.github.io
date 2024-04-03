## Arrow

dora-rs communicates messages using Apache Arrow data format

When receiving data, the value is of type arrow Array. For Python, you will be able to convert the data as follows:

```python
import numpy as np
import pandas as pd
import pyarrow as pa

## ...

received_data = dora_event["value"]
assert isinstance(received_data, pa.Array)
assert isinstance(received_data.to_pylist(), list)
assert isinstance(received_data.to_numpy(), np.ndarray) # Zero-Copy Read Only
assert isinstance(received_data.to_pandas(), pd.Series)

send_output(pa.array([]))
```

<p align="center">
    <img src="/img/arrow.png" width="80%"/>
</p>
