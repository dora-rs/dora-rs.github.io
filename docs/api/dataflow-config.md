# Dataflow Specification

Dataflows are specified through a YAML file. This section presents our current draft for the file format. It only includes basic functionality for now, we will extend it later when we introduce more advanced features.

## Dataflow

Dataflows are specified through the following format:

```yaml
nodes:
  - id: foo
    # ... (see below)
  - id: bar
    # ... (see below)
```

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
