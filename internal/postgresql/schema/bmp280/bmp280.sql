CREATE SCHEMA IF NOT EXISTS bmp280;
CREATE SCHEMA IF NOT EXISTS app;

DROP TABLE IF EXISTS bmp280.temperature;

CREATE TABLE bmp280.temperature (
  id SERIAL PRIMARY KEY,
  temperature real,
  descricao VARCHAR(100) NOT NULL,
  ip VARCHAR(20) NOT NULL,
  countryCode VARCHAR(20) NOT NULL,
  regionCode VARCHAR(20) NOT NULL,
  city VARCHAR(20) NOT NULL,
  latitude VARCHAR(20) NOT NULL,
  longitude VARCHAR(20) NOT NULL,
  dia timestamp NOT NULL
);

DROP TABLE IF EXISTS bmp280.pressure;

CREATE TABLE bmp280.pressure (
  id SERIAL PRIMARY KEY,
  pressure real,
  descricao VARCHAR(100) NOT NULL,
  ip VARCHAR(20) NOT NULL,
  countryCode VARCHAR(20) NOT NULL,
  regionCode VARCHAR(20) NOT NULL,
  city VARCHAR(20) NOT NULL,
  latitude VARCHAR(20) NOT NULL,
  longitude VARCHAR(20) NOT NULL,
  dia timestamp NOT NULL
);

DROP TABLE IF EXISTS app.cpu;

CREATE TABLE app.cpu (
  id SERIAL PRIMARY KEY,
  total_cpu real,
  user_cpu real,
  system_cpu real,
  idle_cpu real,
  ip VARCHAR(20) NOT NULL,
  dia timestamp NOT NULL
);

DROP TABLE IF EXISTS app.memory;

CREATE TABLE app.memory (
  id SERIAL PRIMARY KEY,
  total_memory real,
  used_memory real,
  ip VARCHAR(20) NOT NULL,
  dia timestamp NOT NULL
);
