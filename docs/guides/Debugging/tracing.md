# Tracing

Dora supports distributed tracing via OpenTelemetry (OTLP). The previous Jaeger integration (DORA_JAEGER_TRACING) has been removed as of recent versions. Use the OTLP endpoint instead.

## Setup with SigNoz

[SigNoz](https://signoz.io) is the recommended open-source observability backend for dora tracing.

### 1. Start SigNoz

```bash
git clone -b main https://github.com/SigNoz/signoz.git
cd signoz/deploy
docker compose -f docker/docker-compose.yaml up -d
```

SigNoz UI will be available at: http://localhost:8080

### 2. Run your dataflow with tracing

```bash
export DORA_OTLP_ENDPOINT=http://localhost:4317
dora run dataflow.yaml --uv
```

### 3. View traces

Open SigNoz at http://localhost:8080 and navigate to Services or Traces Explorer to inspect your dataflow telemetry.

## Notes

- DORA_JAEGER_TRACING is no longer supported and has been removed from the codebase.
- The OTLP collector in SigNoz listens on port 4317 by default.
- Metrics ingestion is active when the endpoint is correctly configured.
