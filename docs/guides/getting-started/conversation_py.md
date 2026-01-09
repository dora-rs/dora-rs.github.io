---
sidebar_position: 1
---

# Python Conversation

## 1. Install Dora CLI and Dependencies

First, ensure you have **Python 3.11** installed.

Next, install `uv` if you haven't already:

```bash
pip install uv
```

Then, create and activate a virtual environment:

```bash
uv venv --seed -p 3.11
source .venv/bin/activate  # Linux/macOS
\.venv\Scripts\activate    # Windows
```

Finally, install the Dora CLI:

```bash
pip install dora-rs-cli
```

---

## 2. Create a new dataflow

Create a Python-based dataflow and navigate into the project directory:

```bash
dora new conversation_py --lang python
cd conversation_py
```

This creates the following `conversation_py` directory structure:

```text
├── dataflow.yml
├── listener-1
│   ├── README.md
│   ├── listener_1
│   │   ├── __init__.py
│   │   ├── __main__.py
│   │   └── main.py
│   ├── pyproject.toml
│   └── tests
│       └── test_listener_1.py
└── talker-1
    ├── README.md
    ├── pyproject.toml
    ├── talker_1
    │   ├── __init__.py
    │   ├── __main__.py
    │   └── main.py
    └── tests
        └── test_talker_1.py
```

---

## 3. Add another node (optional)

From inside the `conversation_py` project directory, you can add another node to the workspace:

```bash
dora new --kind node talker --lang python
```

Now open the `talker-1/talker_1/main.py` file in your text editor.

---

## 4. How the default node works

Your node is very bare bones right now. Below is an explanation of how it works by default.

### Importing and initializing the node

```python
from dora import Node
import pyarrow as pa

def main():
    node = Node()
```

### Handling input events

```python
for event in node:
    if event["type"] == "INPUT":
        print(
            f"""Node received:
id: {event["id"]},
value: {event["value"]},
metadata: {event["metadata"]}"""
        )
```

### Sending output to another node

```python
node.send_output("speech", pa.array(["Hello World"]))
```

- `send_output` sends data to other nodes.
- `"speech"` is the output ID referenced in the dataflow.
- `pa.array(["Hello World"])` creates an Apache Arrow array.
- Metadata is omitted for simplicity in this tutorial.

---

## 5. Listener node breakdown

**File:** `listener-1/listener_1/main.py`

```python
from dora import Node

def main():
    node = Node()
    for event in node:
        if event["type"] == "INPUT":
            message = event["value"][0].as_py()
            print(f"I heard {message} from {event['id']}")

if __name__ == "__main__":
    main()
```

- `event["value"]` is an Apache Arrow array.
- `[0]` accesses the first element.
- `.as_py()` converts it into a native Python value.

---

## 6. Running the dataflow

Edit `dataflow.yml` to connect the nodes:

```yaml
nodes:
  - id: talker
    path: talker-1/talker_1/main.py
    inputs:
      tick: dora/timer/secs/1
    outputs:
      - speech

  - id: listener
    path: listener-1/listener_1/main.py
    inputs:
      speech: talker/speech
```

### Build and run the dataflow

```bash
# Install dependencies
dora build dataflow.yml --uv

# Run the dataflow
dora run dataflow.yml --uv
```

You should see:

```text
I heard Hello World from speech
```

To stop the dataflow, press **Ctrl+C**.

---

## 7. Conclusion

Well done reaching the end of this tutorial.  
You’ve created and run a Dora dataflow connecting a talker and listener node.

From here, try experimenting with different data types or exploring Dora’s advanced features.
