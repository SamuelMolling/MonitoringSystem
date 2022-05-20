CREATE SCHEMA IF NOT EXISTS app;

DROP TABLE IF EXISTS app.temperature;

CREATE SEQUENCE app.temperature_id_seq;

CREATE TABLE app.temperature (
  id integer NOT NULL DEFAULT nextval('app.temperature_id_seq'),
  temperature real,
  ip VARCHAR(20) NOT NULL,
  countryCode VARCHAR(20) NOT NULL,
  regionCode VARCHAR(20) NOT NULL,
  city VARCHAR(20) NOT NULL,
  latitude VARCHAR(20) NOT NULL,
  longitude VARCHAR(20) NOT NULL,
  dia timestamp NOT NULL
);

ALTER SEQUENCE app.temperature_id_seq
OWNED BY app.temperature.id;

DROP TABLE IF EXISTS app.pressure;

CREATE SEQUENCE app.pressure_id_seq;

CREATE TABLE app.pressure (
  id integer NOT NULL DEFAULT nextval('app.pressure_id_seq'),
  pressure real,
  ip VARCHAR(20) NOT NULL,
  countryCode VARCHAR(20) NOT NULL,
  regionCode VARCHAR(20) NOT NULL,
  city VARCHAR(20) NOT NULL,
  latitude VARCHAR(20) NOT NULL,
  longitude VARCHAR(20) NOT NULL,
  dia timestamp NOT NULL
);

CREATE TABLE app.humidity (
  id integer NOT NULL DEFAULT nextval('app.humidity_id_seq'),
  pressure real,
  ip VARCHAR(20) NOT NULL,
  countryCode VARCHAR(20) NOT NULL,
  regionCode VARCHAR(20) NOT NULL,
  city VARCHAR(20) NOT NULL,
  latitude VARCHAR(20) NOT NULL,
  longitude VARCHAR(20) NOT NULL,
  dia timestamp NOT NULL
);


ALTER SEQUENCE app.humidity_id_seq
OWNED BY app.humidity_id_seq.id;

DROP TABLE IF EXISTS app.cpu;

CREATE SEQUENCE app.cpu_id_seq;

CREATE TABLE app.cpu (
  id integer NOT NULL DEFAULT nextval('app.cpu_id_seq'),
  total_cpu real,
  user_cpu real,
  system_cpu real,
  idle_cpu real,
  ip VARCHAR(20) NOT NULL,
  dia timestamp NOT NULL
);

ALTER SEQUENCE app.cpu_id_seq
OWNED BY app.cpu_id_seq.id;

DROP TABLE IF EXISTS app.memory;

CREATE SEQUENCE app.memory_id_seq;

CREATE TABLE app.memory (
  id integer NOT NULL DEFAULT nextval('app.memory_id_seq'),
  total_memory real,
  used_memory real,
  ip VARCHAR(20) NOT NULL,
  dia timestamp NOT NULL
);

ALTER SEQUENCE app.memory_id_seq
OWNED BY app.memory_id_seq.id;

CREATE USER "app" WITH PASSWORD 'app';
CREATE USER "grafana" WITH PASSWORD 'grafana';

GRANT ALL PRIVILEGES ON DATABASE "monitoring_system" to "grafana";

