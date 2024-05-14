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
   .
   ├── dataflow.yml
   ├── node_1
   │   └── node_1.py
   ├── op_1
   │   └── op_1.py
   └── op_2
       └── op_2.py
   ```
   You may delete the two operators named op_1 and op_2 but keep node_1 as we will use it later.

2. Go ahead and add another node to the workspace with 
   ```bash
    dora new --kind custom-node talker
   ```
   Now open up the `talker.py` file in your text editor.
3. How the default node works  

   Your node is very bare bones right now but here is an explanation of what is going on in it by default.  
   - This section imports and initializes the node.
   ```python
   #!/usr/bin/env python3
   # -*- coding: utf-8 -*-

   from dora import Node

   node = Node()
   ```
   - This part of the code checks to see if the node has received any input, and if it has, it will print out some data relating to the input. 
   ```python
   event = node.next()
   if event["type"] == "INPUT":
       print(
           f"""Node received:
       id: {event["id"]},
       value: {event["value"]},
       metadata: {event["metadata"]}"""
       )
   ```

4. Adjusting the talker node  

   Since this is the talker node we are going to make it send an output to another node. To accomplish this we only need to add one line.
   ```python
     #!/usr/bin/env python3
     # -*- coding: utf-8 -*-

     from dora import Node

     node = Node()

     event = node.next()
     if event["type"] == "INPUT":
         print(
             f"""Node received:
         id: {event["id"]},
         value: {event["value"]},
         metadata: {event["metadata"]}"""
         )
         node.send_output("speech", b"Hello World", None) # add this line
   ```
   This line is looks complex so lets break it down.  
   - We are using the `send_output` method to send a string as bytes to the listener node. 
   - The first argument is the id of the output we want to send to be referenced later in the dataflow. 
   - The second argument is the value of the output with a b in front to specify that it is to be sent in bytes. 
   - The third argument is the metadata of the output which is not necessary for this tutorial.
5. Adjust the listener node  
   
   Change the name of node_1 to listener.  For this file we need to do a bit more than we needed to in the talker file.
   ```python
     #!/usr/bin/env python3
     # -*- coding: utf-8 -*-

     from dora import Node
     import pyarrow as pa

     node = Node()

     event = node.next()
     if event["type"] == "INPUT":
         message_list = event["value"].to_pylist()
         message_bytes = bytes(message_list)
         formatted_message = message_bytes.decode("utf-8")
         print(
             f"""I heard {formatted_message}"""
         )
   ```
   Let's break this down line by line.  
   - `message_list = event["value"].to_pylist()` This line converts the value of the input into a python list. Since the Apache Arrow data is not a native python format we need to convert it to one before we can manipulate it in any other way with python.  
   - `message_bytes = bytes(message_list)` The message list is a list of integers, since it was originally sent as bytes we need to convert it back to bytes before it can be decoded.
   - `formatted_message = message_bytes.decode("utf-8")` The message bytes are now a bytes object, we need to decode it to a string before we can print it out.
   - `f"""I heard {formatted_message}"""` This line is a python string format. It is a way to insert variables into a string. In this case we are inserting the `formatted_message` variable into the string.


6. Running the dataflow  

   Before we can run the dataflow we have to change it first
   ```yaml
   nodes:
     - id: talker
       custom:
         source: talker/talker.py
         inputs:
           tick: dora/timer/secs/1
         outputs:
           - speech
 
     - id: listener
       custom:
         source: listener/listener.py
         inputs:
           speech: talker/speech
   ```
   Before we run the dataflow, let's go over it really quick.  
   - The talker node will be sent an input every second, which will then make it send an output.
   - The listener node will be sent an input from the talker node and will then print out what it heard.
   - The name of the output of the talker corresponds to the id set in the talker node.

   Now lets run the dataflow.  
   - In the terminal run 
   ```bash
   dora up 
   ```
   - Then run 
   ```bash
   dora start dataflow.yml --name conversation
   ```
   - The dataflow will run one loop and then stop. Now you will run
   ```bash
   dora logs conversation listener
   ```
   - You should see the listener node print out the message `"I heard Hello World"`.

7. Conclusion
   
   Well done reaching the end of this tutorial! You've learned to create and run a custom Dora dataflow, integrating a talker and listener node. This setup forms the foundation for more complex dataflows. For further exploration, consider experimenting with different data types or exploring Dora's advanced features. More tutorials coming soon!


