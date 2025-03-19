---
sidebar_position: 1
---

# Python Conversation

Dora enables real-time data processing through a flexible and modular framework. This guide walks you through setting up a simple conversation, consisting of a `talker` and `listener` node. The `talker` sends a message, while the `listener` receives and processes it.

---

## 1. Setting Up the Environment

Before you start, ensure you have Python 3.11 or later installed. 



### Creating a Virtual Environment

To keep dependencies isolated, create a virtual environment using `uv`:

```bash

uv venv --seed -p 3.11

dora venv activate  # macOS/Linux

.venv\Scripts\activate  # Windows

```

### Installing Dora CLI

Once the virtual environment is activated, install Dora:

```bash

pip install dora-rs-cli

```

---

## 2. Creating a New Conversation

Dora organizes real-time processing workflows as "conversations." To start, create a new conversation directory:

```bash

dora new --kind conversation --lang python my_conversation

cd my_conversation

```

This command initializes the necessary project structure for Dora.

---

## 3. Adding Nodes to the Conversation

Nodes are the fundamental building blocks of a Dora conversation. Each node processes or transfers data between components.

### Adding a Talker Node

Create a new `talker` node inside the conversation:

```bash

dora new --kind node talker --lang python

```

This generates a `talker` directory inside `my_conversation`, containing the following structure:

```

my_conversation/

  ├── talker/

  │   ├── __init__.py

  │   ├── __main__.py

  │   ├── main.py

  │   ├── pyproject.toml

  │   └── tests/

```

Now, open `talker/main.py` and inspect the generated code. The `talker` node emits messages on an output stream.

### Adding a Listener Node

Similarly, create a `listener` node:

```bash

dora new --kind node listener --lang python

```

Navigate to `listener/main.py` and inspect its contents. The `listener` node listens for incoming messages and processes them accordingly.

---

## 4. Understanding Node Functionality



The default `talker` implementation looks like this:

```python

from dora import Node

import pyarrow as pa

def main():

    node = Node()

    for event in node:

        if event["type"] == "INPUT":

            print(f"Talker received: {event}")

            node.send_output(output_id="speech", data=pa.array(["Hello World"]))

if __name__ == "__main__":

    main()

```

### How the Listener Node Works

The `listener` node processes messages received from the `talker` node. It extracts data from the Apache Arrow format and converts it into a native Python type:

```python

from dora import Node

def main():

    node = Node()

    for event in node:

        if event["type"] == "INPUT":

            print(f"Listener received: {event['value'][0].as_py()}")

if __name__ == "__main__":

    main()

```

---

## 5. Configuring the Conversation

To enable communication between nodes, define a `dataflow.yml` file:

```yaml

nodes:

  - id: talker

    path: talker/main.py

    inputs:

      tick: dora/timer/secs/1

    outputs:

      - speech

  - id: listener

    path: listener/main.py

    inputs:

      speech: talker/speech

```

This configuration ensures that the `talker` sends messages every second, which are then received by the `listener` node.

---

## 6. Building and Running the Conversation

### Building the Conversation

Before running the conversation, build it to ensure dependencies are installed:

```bash

dora build dataflow.yml

```

### Running the Conversation

Start the conversation with:

```bash

dora run dataflow.yml

```

You should see output in the terminal similar to:

```

Talker: Sending 'Hello World'

Listener: Received 'Hello World'

```

This confirms that the nodes are successfully communicating.

---

## Conclusion

Congratulations on completing the **Python Conversation** tutorial! You have successfully set up and run a basic Dora conversation, including a **Talker** and **Listener** node. This foundational knowledge prepares you for more advanced topics.

To continue your learning, explore the next steps:

-   **Webcam Plot**: Learn how to integrate live video streaming into Dora.
-   **Yolov8**: Apply real-time object detection using YOLOv8.
-   **LLMs**: Connect Dora with Large Language Models for AI-driven conversations.

For deeper insights into Dora development, check out the **Development** and **Debugging** sections. Keep experimenting and refining your workflows!


