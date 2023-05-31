# Tracing

You can easily integrate jaeger tracing by providing `DORA_JAEGER_TRACING` environment variable

```bash
export DORA_JAEGER_TRACING=172.17.0.1:6831 # Jaeger backend address
dora up 
dora start dataflow.yml
```

To start a jaeger backend, you can use:

```bash
docker run -d -p6831:6831/udp -p6832:6832/udp -p16686:16686 jaegertracing/all-in-one:latest
```

You can then check jaeger UI: http://localhost:16686/