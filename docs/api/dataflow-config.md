# Dataflow Specification

Dataflows are specified through a YAML file.
This article documents all available config options and their behavior.

## Nodes

The most important field is the `nodes` field, which lists the nodes of the dataflow.
Each node is identified by a unique `id`:

```yaml
nodes:
  - id: foo
    path: path/to/the/executable
    # ... (see below)
  - id: bar
    path: path/to/another/executable
    # ... (see below)
```

For each node, you need to specify the `path` of the executable or script that Dora should run when starting the node.
Most of the other node fields are optional, but you typically want to specify at least some `inputs` and/or `outputs`.

### Node Fields

Below we group the fields into [_Identification_](#identification), [Execution](#execution), [IO](#io), and [Build][#build] fields.

#### Identification

Identification fields assign identifiers and other description to nodes.

##### `id` (required)

Node IDs can be arbitrary strings with the following limitations:

- They must not contain any `/` characters (slashes).
- We do not recommend using whitespace characters (e.g. spaces) in IDs

Each node must have a unique ID field.

##### `name`

In addition to the `id` field, nodes can also have a `name` field.
Typical usage is setting a short `id` and a more descriptive, longer `name` for the node.
The `name` field is optional.

##### `description`

Nodes can also include a `description` text to describe the behavior of the node.
The field is optional.

### Execution

Execution fields define how a node is executed, including command-line arguments and environment
variables.

##### `path` (required)

Specifies the path of the executable or script that Dora should run when starting the dataflow.
This can point to a normal executable (e.g. when using a compiled language such as Rust) or a Python script.

Dora will automatically append a `.exe` extension on Windows systems when the specified file name has no extension.

```yaml
nodes:
  - id: rust-example
    path: target/release/rust-node
  - id: python-example
    path: ./receive_data.py
```

TODO URL support

##### `args`

The command-line arguments that should be passed to the executable/script specified in `path`.
The arguments should be separated by space.
This field is optional and defaults to an empty argument list.

```yaml
nodes:
  - id: example
    path: example-node
    args: -v --some-flag foo
```

##### `env`

Key-value map of environment variables that should be set for the node execution.
This field is optional.

```yaml
nodes:
  - id: camera
    path: dora-pyrealsense
    env:
      IMAGE_WIDTH: 640
      IMAGE_HEIGHT: 480
```

#### `deploy` (unstable)

TODO

### IO

IO fields define the inputs and outputs of nodes.
All IO fields are optional.

#### `inputs`

TODO

#### `outputs`

TODO

#### `send_stdout_as`

TODO

### Build

Build fields define how a node is set up and built on `dora build`.
All build fields are optional.

##### `build`

The `build` key specifies the command that should be invoked for building the node.
The key expects a single- or multi-line string.

Each line is run as a separate command.
Spaces are used to separate arguments.

Note that all the environment variables specified in the [`env`](#env) field are also applied to the build commands.

```yaml
- id: build-example
  build: cargo build -p receive_data --release
  path: target/release/receive_data
- id: multi-line-example
  build: |
      pip install flash-attn
      pip install -e ../../node-hub/dora-phi4
  path: dora-phi4
```

**Special treatment of `pip`:** Build lines that start with `pip` or `pip3` are treated in a special way:
If the `--uv` argument is passed to the `dora build` command, all `pip`/`pip3` commands are run through the [`uv` package manager](https://docs.astral.sh/uv/).

#### `git`

The `git` key allows downloading nodes from git repositories.
This can be especially useful for distributed dataflows.

When a `git` key is specified, `dora build` automatically clones the specified repository (or reuse an existing clone).
Then it checks out the specified [`branch`](#branch), [`tag`](#tag), or [`rev`](#rev), or the default branch if none of them are specified.
Afterwards it runs the `build` command if specified.

Note that the git clone directory is set as working directory for both the [`build`](#build) command and the specified [`path`](#path).

```yaml
nodes:
  - id: rust-node
    git: https://github.com/dora-rs/dora.git
    build: cargo build -p rust-dataflow-example-node
    path: target/debug/rust-dataflow-example-node
```

#### `branch`

The `branch` field is only allowed in combination with the [`git`](#git) field.
It specifies the branch that should be checked out after cloning.
Only one of `branch`, `tag`, or `rev` can be specified.

#### `tag`

The `tag` field is only allowed in combination with the [`git`](#git) field.
It specifies the tag that should be checked out after cloning.
Only one of `branch`, `tag`, or `rev` can be specified.

#### `rev`

The `rev` field is only allowed in combination with the [`git`](#git) field.
It specifies the git revision (e.g. a commit hash) that should be checked out after cloning.
Only one of `branch`, `tag`, or `rev` can be specified.


## Operators

Operators are an experimental, lightweight alternative to nodes.
Instead of running as a separate process, operators are linked into a runtime process.
This allows running multiple operators to share a single address space (not supported for Python currently).

Operators are defined as part of the node list, as children of a runtime node.
A runtime node is a special node that specifies no `path` field, but contains an `operators` field instead.

TODO

## Debug Options

Dora defines a set of debug options that can be controlled through a top-level `debug` field in the dataflow specification.

### `publish_all_messages_to_zenoh`

TODO

# OLD

### Inputs and Outputs

Each operator or custom node has a separate namespace for its outputs. To refer to outputs, the \<operator\>/\<output\> syntax is used. This way, there are no name conflicts between operators.

Input operands are specified using the \<name\>: \<operator\>/\<output\> syntax, where \<data\> is the internal name that should be used for the operand. The main advantage of this name mapping is that the same operator executable can be reused multiple times on different input.

## Nodes

Nodes are defined using the following format:

```yaml
nodes:
  - id: some-unique-id
    # For nodes with multiple operators
    operators:
      - id: operator-1
        # ... (see below)
      - id: operator-2
        # ... (see below)

  - id: some-unique-id-2
    custom:
      source: path/to/timestamp
      env:
        - ENVIRONMENT_VARIABLE_1: true
      working-directory: some/path

      inputs:
        input_1: operator_2/output_4
        input_2: custom_node_2/output_4
      outputs:
        - output_1

  # Unique operator
  - id: some-unique-id-3
    operator:
      # ... (see below)
```

Nodes specify the executable name and arguments like a normal shell operation through the `run` field. Through the optional `env` field, it is possible to set environment variables for the process. The optional `working-directory` field allows to overwrite the directory in which the program is started.

To integrate with the rest of the dora dataflow, custom nodes must specify their inputs and outputs, similar to operators. They can reference outputs of both operators, and other custom nodes.
