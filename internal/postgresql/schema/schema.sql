--Create Schema app 
CREATE SCHEMA IF NOT EXISTS app;

--Table Locality
DROP TABLE IF EXISTS app.locality;
CREATE TABLE app.locality (
  ip VARCHAR(20) PRIMARY KEY,
  countryCode VARCHAR(2) NOT NULL,
  regionCode VARCHAR(2) NOT NULL,
  city VARCHAR(20) NOT NULL
);

--Table Temperature
DROP TABLE IF EXISTS app.temperature;
CREATE SEQUENCE app.temperature_id_seq;
CREATE TABLE app.temperature (
  id integer NOT NULL DEFAULT nextval('app.temperature_id_seq'),
  ip VARCHAR(20) REFERENCES app.locality(ip) NOT NULL,
  temperature real NOT NULL,
  dia TIMESTAMP NOT NULL
);
ALTER SEQUENCE app.temperature_id_seq
OWNED BY app.temperature.id;

--Table Pressure
DROP TABLE IF EXISTS app.pressure;
CREATE SEQUENCE app.pressure_id_seq;
CREATE TABLE app.pressure (
  id integer NOT NULL DEFAULT nextval('app.pressure_id_seq'),
  ip VARCHAR(20) REFERENCES app.locality(ip) NOT NULL,
  pressure REAL NOT NULL,
  dia TIMESTAMP NOT NULL
);
ALTER SEQUENCE app.pressure_id_seq
OWNED BY app.pressure.id;

--Table Humidity
DROP TABLE IF EXISTS app.humidity;
CREATE SEQUENCE app.humidity_id_seq;
CREATE TABLE app.humidity (
  id integer NOT NULL DEFAULT nextval('app.humidity_id_seq'),
  ip VARCHAR(20) REFERENCES app.locality(ip) NOT NULL,
  humidity REAL NOT NULL,
  dia TIMESTAMP NOT NULL
);
ALTER SEQUENCE app.humidity_id_seq
OWNED BY app.humidity.id;

--Table Cpu
DROP TABLE IF EXISTS app.cpu;
CREATE SEQUENCE app.cpu_id_seq;
CREATE TABLE app.cpu (
  id integer NOT NULL DEFAULT nextval('app.cpu_id_seq'),
  ip VARCHAR(20) REFERENCES app.locality(ip) NOT NULL,
  total_cpu real NOT NULL,
  user_cpu real NOT NULL,
  system_cpu real NOT NULL,
  idle_cpu real NOT NULL,
  dia TIMESTAMP NOT NULL
);
ALTER SEQUENCE app.cpu_id_seq
OWNED BY app.cpu.id;

--Table Memory
DROP TABLE IF EXISTS app.memory;
CREATE SEQUENCE app.memory_id_seq;
CREATE TABLE app.memory (
  id integer NOT NULL DEFAULT nextval('app.memory_id_seq'),
  ip VARCHAR(20) REFERENCES app.locality(ip) NOT NULL,
  total_memory real NOT NULL,
  used_memory real NOT NULL,
  dia TIMESTAMP NOT NULL
);
ALTER SEQUENCE app.memory_id_seq
OWNED BY app.memory.id;

--Create users app and grafana
CREATE USER "app" WITH PASSWORD 'app';
CREATE USER "grafana" WITH PASSWORD 'grafana';

--Grant all privileges for app and grafana
GRANT ALL PRIVILEGES ON DATABASE "monitoring_system" to "app";
GRANT ALL PRIVILEGES ON DATABASE "monitoring_system" to "grafana";

