---
sidebar_position: 2
---

# C++ Conversation

## 1. Install Dora CLI and Dependencies

Because Dora connects C++ to a high-performance Rust core, you need C++ build tools, the Rust toolchain, and Python (to run the Dora CLI orchestrator).

First, ensure you have the required system tools:
- **C++ Compiler & CMake:** (e.g., `sudo apt install build-essential cmake` on Ubuntu)
- **Rust & Cargo:** Install via [rustup](https://rustup.rs/) (`curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh`)
- **Python 3.11**

Next, install `uv` to manage the Python environment. *(Linux note: If `pip install uv` throws an externally-managed environment error, install it via their standalone script: `curl -LsSf https://astral.sh/uv/install.sh | sh`)*.

```bash
pip install uv
```

Then, create and activate a virtual environment:

```bash
uv venv --seed -p 3.11
source .venv/bin/activate  # Linux/macOS
.venv\Scripts\activate     # Windows
```

Finally, install the Dora CLI 

```bash
pip install dora-rs-cli
```

---

## 2. Create a new dataflow

Create a C++ based dataflow and navigate into the project directory:

```bash
dora new conversation_cxx --lang cxx
cd conversation_cxx
```

This creates the following `conversation_cxx` directory structure. Notice that C++ projects rely heavily on `CMakeLists.txt` to orchestrate the build process.

```text
├── CMakeLists.txt
├── dataflow.yml
├── listener_1
│   └── node.cc
├── talker_1
│   └── node.cc
└── talker_2
    └── node.cc
```

---

## 3. Add another node (optional)

From inside the `conversation_cxx` project directory, you can add another C++ node to the workspace:

```bash
dora new --kind node talker --lang cxx
```

Now open the `talker_1/node.cc` file in your text editor.

---

## 4. How the default node works

Your C++ node is very bare bones right now. Below is an explanation of how it works by default and how it safely shares memory with the Rust daemon.

### Importing and initializing the node

```cpp
#include "dora-node-api.h"
#include <iostream>
#include <vector>

int main() {
    auto dora_node = init_dora_node();
```
- `init_dora_node()` registers your executable with the Dora Daemon and establishes the shared memory connections.

### Handling input events and timers

```cpp
    for (int i = 0; i < 20; i++) {
        auto event = dora_node.events->next();
        auto ty = event_type(event);
        
        if (ty == DoraEventType::AllInputsClosed) {
            break;
        } else if (ty == DoraEventType::Input) {
            // Logic goes here
        }
```
- `dora_node.events->next()` blocks the loop completely until an event arrives. 
- In the case of this talker, it does not receive data from another node. Instead, the `dataflow.yml` assigns it a timer (`dora/timer/millis/100`), acting as an invisible metronome. The Rust daemon sends an `Input` event exactly every 100ms to drive the loop forward.

### Sending output via zero-copy memory

```cpp
            std::string message{"Hello World!"};
            rust::Slice<const uint8_t> message_slice{reinterpret_cast<const uint8_t*>(message.c_str()), message.size()};
            auto result = send_output(dora_node.send_output, "speech", message_slice);
```
- To achieve ultra-low latency, Dora uses zero-copy memory. 
- We take our native `std::string` and use `reinterpret_cast` to cast its raw memory pointer into a `rust::Slice`. 
- `send_output` hands this slice to the `"speech"` channel, allowing downstream nodes to read the exact memory address instantly without copying the data.

---

## 5. Listener node breakdown

**File:** `listener_1/node.cc`

When receiving data, the listener must safely unpack the shared memory pointer back into a native C++ object.

```cpp
        else if (ty == DoraEventType::Input)
        {
            auto input = event_as_input(std::move(event));
            auto input_id = input.id;
            auto message = std::string(reinterpret_cast<const char*>(input.data.data()), input.data.size());
            std::cout << "I heard " << message << " from " << std::string(input_id) << std::endl;
        } 
```
- `event_as_input(std::move(event))` safely transfers ownership of the memory block from the generic event.
- `input.data.data()` retrieves the raw pointer to the payload, which we `reinterpret_cast` back into a standard C++ `std::string` using `input.data.size()`.

---

## 6. Running the dataflow

Unlike Python scripts, C++ nodes must be explicitly compiled into binaries using CMake before the Dora Daemon can run them. By default, CMake outputs these binaries to a `build/` directory.

Edit `dataflow.yml` to ensure your node paths point to the `build/` folder so Dora knows where to find your executables:

```yaml
nodes:
  - id: talker_1
    path: build/talker_1
    inputs:
      tick: dora/timer/millis/100
    outputs:
      - speech
  - id: talker_2
    path: build/talker_2
    inputs:
      tick: dora/timer/secs/2
    outputs:
      - speech

  - id: listener_1
    path: build/listener_1
    inputs:
      speech-1: talker_1/speech
      speech-2: talker_2/speech
```

### Build and run the dataflow

First, compile your C++ project:

```bash
# Compile the C++ nodes
mkdir build
cd build
cmake ..
make
cd ..
```

Once compiled, run the dataflow from the root project directory:

```bash
# Run the dataflow
dora run dataflow.yml
```

You should see:

```text
I heard Hello World! from speech
```

To stop the dataflow, press **Ctrl+C**.

---

## 7. Conclusion

Well done reaching the end of this tutorial.  
You’ve compiled and run a Dora dataflow connecting a talker and listener node in C++, and learned how to navigate Rust bindings and zero-copy memory management.

From here, try experimenting with different data types or exploring Dora’s advanced features.