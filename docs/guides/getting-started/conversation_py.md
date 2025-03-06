---
sidebar_position: 1
---

# Python Conversation

1. Create a new dataflow

   ```bash
   # Create a new Python-based dataflow and navigate into the project directory
   dora new conversation_py --lang python
   cd conversation_py
   ```

   This creates the following `conversation_py` directory

   ```bash
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
   ├── talker-1
   │   ├── README.md
   │   ├── pyproject.toml
   │   ├── talker_1
   │   │   ├── __init__.py
   │   │   ├── __main__.py
   │   │   └── main.py
   │   └── tests
   │       └── test_talker_1.py
   └── talker-2
       ├── README.md
       ├── pyproject.toml
       ├── talker_2
       │   ├── __init__.py
       │   ├── __main__.py
       │   └── main.py
       └── tests
          └── test_talker_2.py
   ```

2. Go ahead and add another node to the workspace with

   ```bash
    dora new --kind node talker --lang python
   ```

   Now open up the `talker/talker/main.py` file in your text editor.

3. How the default node works

   Your node is very bare bones right now but here is an explanation of what is going on in it by default.

   - This section imports and initializes the node.

   ```python
   from dora import Node
   import pyarrow as pa

   def main():
      node = Node()
   ```

   - This part of the code checks to see if the node has received any input, and if it has, it will print out some data relating to the input.

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

   - This line send an output to other nodes.

   ```python
         node.send_output("speech", pa.array(["Hello World"])) # add this line
   ```

   - We are using the `send_output` method to send a string as an arrow array to the listener node.
   - The first argument is the id of the output we want to send to be referenced later in the dataflow.
   - The second argument, `pa.array(["Hello World"])`, uses Apache Arrow to handle the data. Here, `pa.array` creates an Arrow array from the list `["Hello World"]`.
   - The third argument for metadata is omitted here, indicating that no additional data about the transmission is necessary for this tutorial.

4. Let's breakdown the listener node

   ```python
     from dora import Node


      def main():
         node = Node()
         for event in node:
            if event["type"] == "INPUT":
                  message = event["value"][0].as_py()
                  print(f"""I heard {message} from {event["id"]}""")


      if __name__ == "__main__":
         main()
   ```

   Let's break down the key line in this script.

   - The `event["value"]` contains an Apache Arrow array, which is a structured way to handle complex data efficiently. By accessing `[0]`, we retrieve the first element of this array.
   - The `.as_py()` method converts the Arrow element directly into a native Python data type.

5. Running the dataflow

   Before we can run the dataflow we have to change it first:

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

   Before we run the dataflow, let's go over it really quick.

   - The talker node will be sent an input every second, which will then make it send an output.
   - The listener node will be sent an input from the talker node and will then print out what it heard.
   - The name of the output of the talker corresponds to the id set in the talker node.

   Now lets run the dataflow.

   ```bash
   dora run dataflow.yml --name conversation
   ```

   - You should see the listener node print out the message `"I heard Hello World"`.

6. Conclusion

   Well done reaching the end of this tutorial! You've learned to create and run a custom Dora dataflow, integrating a talker and listener node. This setup forms the foundation for more complex dataflows. For further exploration, consider experimenting with different data types or exploring Dora's advanced features. More tutorials coming soon!
