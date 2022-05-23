--Table Locality
DROP TABLE IF EXISTS locality;
CREATE TABLE locality (
  ip VARCHAR(20) PRIMARY KEY,
  countryCode VARCHAR(2) NOT NULL,
  regionCode VARCHAR(2) NOT NULL,
  city VARCHAR(20) NOT NULL
);

--Table Temperature
DROP TABLE IF EXISTS temperature;
CREATE SEQUENCE temperature_id_seq;
CREATE TABLE temperature (
  id integer NOT NULL DEFAULT nextval('temperature_id_seq'),
  ip VARCHAR(20) REFERENCES locality(ip) NOT NULL,
  temperature real NOT NULL,
  dia TIMESTAMP NOT NULL
);
ALTER SEQUENCE temperature_id_seq
OWNED BY temperature.id;

--Table Pressure
DROP TABLE IF EXISTS pressure;
CREATE SEQUENCE pressure_id_seq;
CREATE TABLE pressure (
  id integer NOT NULL DEFAULT nextval('pressure_id_seq'),
  ip VARCHAR(20) REFERENCES locality(ip) NOT NULL,
  pressure REAL NOT NULL,
  dia TIMESTAMP NOT NULL
);
ALTER SEQUENCE pressure_id_seq
OWNED BY pressure.id;

--Table Humidity
DROP TABLE IF EXISTS humidity;
CREATE SEQUENCE humidity_id_seq;
CREATE TABLE humidity (
  id integer NOT NULL DEFAULT nextval('humidity_id_seq'),
  ip VARCHAR(20) REFERENCES locality(ip) NOT NULL,
  humidity REAL NOT NULL,
  dia TIMESTAMP NOT NULL
);
ALTER SEQUENCE humidity_id_seq
OWNED BY humidity.id;

--Table Cpu
DROP TABLE IF EXISTS cpu;
CREATE SEQUENCE cpu_id_seq;
CREATE TABLE cpu (
  id integer NOT NULL DEFAULT nextval('cpu_id_seq'),
  ip VARCHAR(20) REFERENCES locality(ip) NOT NULL,
  total_cpu real NOT NULL,
  user_cpu real NOT NULL,
  system_cpu real NOT NULL,
  idle_cpu real NOT NULL,
  dia TIMESTAMP NOT NULL
);
ALTER SEQUENCE cpu_id_seq
OWNED BY cpu.id;

--Table Memory
DROP TABLE IF EXISTS memory;
CREATE SEQUENCE memory_id_seq;
CREATE TABLE memory (
  id integer NOT NULL DEFAULT nextval('memory_id_seq'),
  ip VARCHAR(20) REFERENCES locality(ip) NOT NULL,
  total_memory real NOT NULL,
  used_memory real NOT NULL,
  dia TIMESTAMP NOT NULL
);
ALTER SEQUENCE memory_id_seq
OWNED BY memory.id;

--Create users app and grafana
CREATE USER "app" WITH PASSWORD 'app';
CREATE USER "grafana" WITH PASSWORD 'grafana';

--Grant all privileges for app and grafana
GRANT SELECT, INSERT, DELETE, UPDATE ON ALL TABLES IN SCHEMA public TO "app";
GRANT SELECT ON ALL TABLES IN SCHEMA public TO "grafana";

