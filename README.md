# MonitoringSystem

College work to monitor temperature, humidity and pressure from a BMP280 component configured on Arduino with I2C and SPI communication interfaces, in addition to being coded using STM32.

It has a Python client that collects sensor information and sends it to a Golang server that saves it in the PostgreSQL database. In addition, it has a front in Next.js and a grafana with graphs about measurements.

## Installation

Make a clone of repository
```bash
git clone https://github.com/SamuelMolling/MonitoringSystem.git
```

Install Docker on MacOS
```bash
brew install docker
```

Install Docker on Windows
```bash
https://docs.docker.com/desktop/windows/install/
```

Make a pull 
```bash
make install-prerequisites
```

Make a build 
```bash
make build

```
And Run!
```bash
make up
```

If you want to delete a database and grafana directory, use 
```bash
make destroy
```
OBS: This will remove any metrics in the existing directory and data
