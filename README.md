# MonitoringSystem
Monitoring System 

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
make pull
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