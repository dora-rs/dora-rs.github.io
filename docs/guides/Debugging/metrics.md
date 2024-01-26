# Metrics

Dora export metrics to: `http://localhost:4317` if a backend is available at this address.

## Metrics

Currently exported metrics **per node**:

- [x] CPU usage
- [x] Memory usage
- [x] Disk usage

If you are using an NVIDIA GPU, we will include **per node**:

- [x] GPU memory usage

## Future Metrics

- [ ] Battery level and power usage.
- [ ] Global CPU, GPU, RAM, GPU RAM, Disk usage.
- [ ] Temperature of CPU, GPU.
- [ ] Power usage of CPU, GPU.

## InfluxDB and telegraf backend

To use dora with InfluxDB, just install [`telegraf`](https://docs.influxdata.com/telegraf/v1/install/)

And launch it as a background task as follow:

```bash
telegraf --config <CONFIG> # ex: https://eu-central-1-1.aws.cloud2.influxdata.com/api/v2/telegrafs/0c25fb61
```
