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

### Cheatsheet

In Arrow, everything is an array. So even though you might want to only pass a scalar you will have to encapsulate it within a list.

```python
import pyarrow as pa
import numpy as np
import pandas as pd
# List Message

array = pa.array([1, 2, 3])
assert array.to_pylist() == [1, 2, 3], "Did not convert to the Same list"

# String Message
array = pa.array(["Hello World"])
assert array.to_pylist() == ["Hello World"], "Did not convert to the Same list"

# Dictionary/Struct Message
array = pa.array([{"a": 1, "b": 2, "c":[1, 2, 3]}])
assert array.to_pylist() == [{"a": 1, "b": 2, "c":[1, 2, 3]}], "Did not convert to the Same list"

# Numpy Array
array = np.array([1, 2, 3])
pyarrow_array = pa.array(array)
assert (pyarrow_array.to_numpy() == array).all(), "Did not convert to the Same list"

# Pandas Series
d = {'col1': [1, 2], 'col2': [3, 4]}
df = pd.DataFrame(data=d)
pyarrow_array = pa.array(df["col1"])
assert (pyarrow_array.to_pandas() == df["col1"]).all(), "Did not convert to the Same list"
```
