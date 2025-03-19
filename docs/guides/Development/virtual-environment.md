# Virtual Environment

## `run` Command

When using dora with the run command, all python environment will be handled by the current environment.

You should activate the right env before running dora.

You can make sure

## `start` command

When using dora start, you have to make sure that the daemon is running within the right environement.

It is the one that is handled within the `dora up` command.

In case of confusion, you can use `dora destroy && dora up` in the env, you want to be.

## Setting an arbitrary environment

You can overwrite an environment using the `VIRTUAL_ENV` environment variable within the dataflow specification:

```yaml
- id: llm
  build: |
    pip install flash-attn --no-build-isolation
    pip install -e ../../node-hub/dora-phi4
  path: dora-phi4
  inputs:
    text: input/text
  outputs:
    - text
  env:
    VIRTUAL_ENV: /home/peter/Documents/work/dora/node-hub/dora-phi4/.venv
```

And run your datflow with uv:

```bash
dora run dataflow.yml --uv
```

## Using `uv` with `--uv` flag

In order to avoid having to activate and deactivate environment you can create an environment using:

```bash
uv venv
```

And run dora pipeline without activating environment with:

```bash
dora build dataflow.yml --uv
dora run dataflow.yml --uv
```
