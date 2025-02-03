# Virtual Environment

## `run` Command

When using dora with the run command, all python environment will be handled by the current environment.

You should activate the right env before running dora.

You can make sure

## `start` command

When using dora start, you have to make sure that the daemon is running within the right environement.

It is the one that is handled within the `dora up` command.

In case of confusion, you can use `dora destroy && dora up` in the env, you want to be.

## Overwrite an environment

You can overwrite an environment using, the following tricks:

- Using predefined python

```yaml
- id: dora-vad
  path: ../.venv/bin/python
  args: my_script.py
```

- Using shell

```yaml
- id: dora-vad
  path: shell
  args: /path/to/python my_script.py
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
