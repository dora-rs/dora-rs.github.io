# Python Debugger

To use python debugger

- insert in any of your python script:

```bash
pip install --upgrade debugpy
```

```python
import debugpy

# Allow other computers to attach to debugpy at this IP address and port.
debugpy.listen(('localhost', 5678))

# Pause the program until a remote debugger is attached
debugpy.wait_for_client()
```

- add into your IDE Debugger the following config:

```yaml
{
  // Use IntelliSense to learn about possible attributes.
  // Hover to view descriptions of existing attributes.
  // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Python Debugger: Remote Attach",
      "type": "debugpy",
      "request": "attach",
      "connect": {
        "host": "localhost",
        "port": 5678
      },
      "pathMappings": [
        {
          "localRoot": "${workspaceFolder}",
          "remoteRoot": "."
        }
      ]
    }
  ]
}
```

- **Click on the start button of the debugger once the dataflow started!**

## Result

<p align="center">
    <video controls src="/video/python_debug.webm" width="100%"/>
</p>

This would make it possible to debug your python code with a live debugger
