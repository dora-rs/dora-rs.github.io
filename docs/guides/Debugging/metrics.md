# Metrics

Dora export metrics to: `http://localhost:4317` if a backend is available at this address.

## Metrics

Currently exported metrics **per node**:

- [x] CPU usage
- [x] Memory usage
- [x] Disk usage

If you are using an NVIDIA GPU, we also retrieve the data from `nvml`, which include **per node**:

- [x] GPU memory usage

## Future Metrics

- [ ] Battery level and usage
- [ ] Global CPU, Memory, Disk usage
- [ ] GPU power usage
- [ ] GPU utilization
- [ ] Temperature of CPU, GPU

## InfluxDB, telegraf

To use dora with InfluxDB, just install ["telegraf"](https://docs.influxdata.com/telegraf/v1/install/)

And launch it as a background task as follow:

```bash
telegraf --config <CONFIG> # ex: https://eu-central-1-1.aws.cloud2.influxdata.com/api/v2/telegrafs/0c25fb61
```
