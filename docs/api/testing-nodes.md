# Testing Nodes

To ensure that a node behaves as expected, you probably want to do some testing. There are multiple
levels of testing:

- **[Unit testing](https://en.wikipedia.org/wiki/Unit_testing):**
  Verify that a specific function or component behaves as expected.

  Nodes are normal executables/scripts, so you can use the standard testing tools of your chosen
  programming language for unit testing. For example, for Rust nodes you can use Rust's built-in
  [test framework](https://doc.rust-lang.org/book/ch11-01-writing-tests.html) combined with
  `cargo test`.
- **[[Integration testing](https://en.wikipedia.org/wiki/Integration_testing)]:**
  Verify that a node reacts as expected to a set of inputs and that it produces the expected outputs.

  Dora does _not_ offer an automated integration testing feature yet. We plan to add a way
  to run nodes in a standalone "test mode" where inputs are supplied through a special input file
  and outputs are written to an output file. This will enable integration testing of nodes as you
  can verify that each node reacts as expected to given outputs.

  However, Dora nodes can be run in a standalone _"[interactive mode](#interactive-mode)"_, where
  inputs are given through the command line. This feature is useful for manual integration testing.
  See [below](#interactive-mode) for details.
- **[End-to-end testing](https://en.wikipedia.org/wiki/System_testing):**
  Verify that a full dataflow with multiple nodes works as expected.

  This sort of testing is often done manually, using the `dora run` or `dora start` CLI commands.
  If your dataflow has well-defined exit conditions, you can also run automated tests through
  `dora run`: the exit status will report whether any error occurred.


## Interactive Mode

The interactive mode enables starting a node in a standalone mode that prompts for inputs on the
terminal. It is available for all nodes that use the `init_from_env` or `init_interactive`
function for their initialization. To start the interactive mode, start your node executable/script
manually like a normal executable.

Instead of connecting to a `dora daemon`, this interactive mode will prompt for node inputs
on the terminal. In this mode, the node is completely isolated from the dora daemon and
other nodes, so it cannot be part of a dataflow.

### Example

Run any node that uses `init_interactive` or [`init_from_env`](Self::init_from_env) directly
from a terminal. The node will then start in "interactive mode" and prompt you for the next
input:

```bash
> cargo build -p rust-dataflow-example-node
> target/debug/rust-dataflow-example-node
hello
Starting node in interactive mode as DORA_NODE_CONFIG env variable is not set
Node asks for next input
? Input ID
[empty input ID to stop]
```

The `rust-dataflow-example-node` expects a `tick` input, so let's set the input ID to
`tick`. Tick messages don't have any data, so we leave the "Data" empty when prompted:

```bash
Node asks for next input
> Input ID tick
> Data
tick 0, sending 0x943ed1be20c711a4
node sends output random with data: PrimitiveArray<UInt64>
[
  10682205980693303716,
]
Node asks for next input
? Input ID
[empty input ID to stop]
```

We see that both the `stdout` output of the node and also the output messages that it sends
are printed to the terminal. Then we get another prompt for the next input.

If you want to send an input with data, you can either send it as text (for string data)
or as a JSON object (for struct data). Other data types are not supported currently.

Empty input IDs are interpreted as stop instructions:

```bash
> Input ID
given input ID is empty -> stopping
Received stop
Node asks for next input
event channel was stopped -> returning empty event list
node reports EventStreamDropped
node reports closed outputs []
node reports OutputsDone
```

In addition to the node output, we see log messages for the different events that the node
reports. After `OutputsDone`, the node should exit.

### JSON data

In addition to text input, the `Data` prompt also supports JSON objects, which will be
converted to Apache Arrow struct arrays:

```bash
Node asks for next input
> Input ID some_input
> Data { "field_1": 42, "field_2": { "inner": "foo" } }
```

This JSON data is converted to the following Arrow array:

```
StructArray
-- validity: [valid, ]
[
  -- child 0: "field_1" (Int64)
     PrimitiveArray<Int64>
     [42,]
  -- child 1: "field_2" (Struct([Field { name: "inner", data_type: Utf8, nullable: true, dict_id: 0, dict_is_ordered: false, metadata: {} }]))
     StructArray
     -- validity: [valid,]
     [
       -- child 0: "inner" (Utf8)
       StringArray
       ["foo",]
     ]
]
```

