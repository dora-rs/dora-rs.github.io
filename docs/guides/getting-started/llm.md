---
sidebar_position: 4
---

# LLMs

## Adding LLMs to our dataflow

Let's add additional operators:

```bash
wget https://raw.githubusercontent.com/dora-rs/dora/v0.3.2/examples/python-operator-dataflow/keyboard_op.py
wget https://raw.githubusercontent.com/dora-rs/dora/v0.3.2/examples/python-operator-dataflow/microphone_op.py
wget https://raw.githubusercontent.com/dora-rs/dora/v0.3.2/examples/python-operator-dataflow/whisper_op.py
wget https://raw.githubusercontent.com/dora-rs/dora/v0.3.2/examples/python-operator-dataflow/sentence_transformers_op.py
wget https://raw.githubusercontent.com/dora-rs/dora/v0.3.2/examples/python-operator-dataflow/llm_op.py
wget https://raw.githubusercontent.com/dora-rs/dora/v0.3.2/examples/python-operator-dataflow/file_saver_op.py
```

and the dataflow configuration:

```yaml {24-87}
nodes:
  - id: webcam
    operator:
      python: webcam.py
      inputs:
        tick: dora/timer/millis/50
      outputs:
        - image

  - id: object_detection
    operator:
      python: object_detection.py
      inputs:
        image: webcam/image
      outputs:
        - bbox

  - id: plot
    operator:
      python: plot.py
      inputs:
        image: webcam/image
        bbox: object_detection/bbox
        line: llm/line
        keyboard_buffer: keyboard/buffer
        user_message: keyboard/submitted
        assistant_message: llm/assistant_message

  ## Speech to text
  - id: keyboard
    custom:
      source: keyboard_op.py
      outputs:
        - buffer
        - submitted
        - record
        - ask
        - send
        - change
      inputs:
        recording: whisper/text

  - id: microphone
    operator:
      python: microphone_op.py
      inputs:
        record: keyboard/record
      outputs:
        - audio

  - id: whisper
    operator:
      python: whisper_op.py
      inputs:
        audio: microphone/audio
      outputs:
        - text

  ## Code Modifier
  - id: vectordb
    operator:
      python: sentence_transformers_op.py
      inputs:
        query: keyboard/change
        saved_file: file_saver/saved_file
      outputs:
        - raw_file

  - id: llm
    operator:
      python: llm_op.py
      inputs:
        code_modifier: vectordb/raw_file
        assistant: keyboard/ask
        message_sender: keyboard/send
      outputs:
        - modified_file
        - line
        - assistant_message

  - id: file_saver
    operator:
      python: file_saver_op.py
      inputs:
        file: llm/modified_file
      outputs:
        - saved_file
```

Try it out with:

```bash
dora up
dora start dataflow.yml --attach
```

## Speech to text

The keyboard will record every key input of the keyboard.

If the keyboard receive submit the keyword `record`, the microphone is going to be triggered and the audio is going to be transcripted using OpenAI whisper.

## **Change** Code

The code modification flow works by first submitting an instruction with the keyword `change`. The instruction is then going to be passed on the vectorDB to retrieve the closest node source code for it to be changed.

The source code and the instruction is then fed to an LLM to be modified, which is then saved into the source code.

This later triggers a hot-reloading sequence for the node to be reloaded.

The end result should correspond to the instruction.

## **Ask** a question to the assistant

You can ask a question to the assistant by submitting the keyword `ask`.

The question is then going to be passed to the LLM which will reply in the window.

## **Send** a message directly into the dataflow

You can also send a message directly to the dataflow by using the keyword `send` and then specifying the data that you want set.

Note that the data and topic should be specified both in the dataflow and in the LLM node to send data`

## Getting started

You can try the following instruction:

```bash
ask how are you
change bounding box plot to red
change confidence value to percentage
change object detection to only detect person
send 200 200 200 400 to topic line
record # Then speak
```
