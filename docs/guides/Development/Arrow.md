## Arrow

dora-rs communicates messages using Apache Arrow data format

When receiving data, the value is of type arrow Array. For Python, you will be able to convert the data as follows:

```python
import numpy as np
import pandas as pd
import pyarrow as pa

## ...

arrow_array = dora_event["value"]
list = arrow_array.to_pylist()
numpy_array = arrow_array.to_numpy() # Zero-Copy Read Only
pandas_series = arrow_array.to_pandas()

send_output("topic", arrow_array)
```

<p align="center">
    <img src="/img/arrow.png" width="80%"/>
</p>
