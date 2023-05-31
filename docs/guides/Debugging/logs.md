# Logs

To access logs you need to use:
```bash
dora logs <DATAFLOW_ID or DATAFLOW_NAME> <NODE_ID>
```

This enables us to retrieve logs locally or from a remote machine.

We're not using any backend for archiving logs yet! We're closely watching opentelemetry so that in the futures, all data would be logged and archived on a universal format that can be used by many backend.