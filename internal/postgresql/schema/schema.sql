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

--Excluir (DADOS PARA TESTES)
insert into locality (ip, countrycode, regioncode, city) values ('172.225.106.52', 'BR', 'RS', 'Campo Bom');
insert into locality (ip, countrycode, regioncode, city) values ('172.225.106.53', 'BR', 'RS', 'Novo Hamburgo');
insert into locality (ip, countrycode, regioncode, city) values ('172.225.106.55', 'BR', 'RS', 'Dois Irmãos');

insert into temperature (ip, temperature, dia) values ('172.225.106.52', 20, now());
insert into temperature (ip, temperature, dia) values ('172.225.106.52', 21, now());
insert into temperature (ip, temperature, dia) values ('72.225.106.53', 22, now());
insert into temperature (ip, temperature, dia) values ('72.225.106.53', 22, now());
insert into temperature (ip, temperature, dia) values ('172.225.106.55', 25, now());
insert into temperature (ip, temperature, dia) values ('172.225.106.55', 24, now());
insert into temperature (ip, temperature, dia) values ('172.225.106.52', 26, now());
insert into temperature (ip, temperature, dia) values ('172.225.106.53', 25, now());
insert into temperature (ip, temperature, dia) values ('172.225.106.55', 24, now());

insert into pressure (ip, temperature, dia) values ('172.225.106.52', 1, now());
insert into pressure (ip, temperature, dia) values ('172.225.106.52', 1, now());
insert into pressure (ip, temperature, dia) values ('172.225.106.52', 2, now());
insert into pressure (ip, temperature, dia) values ('172.225.106.53', 2, now());
insert into pressure (ip, temperature, dia) values ('172.225.106.53', 5, now());
insert into pressure (ip, temperature, dia) values ('172.225.106.53', 4, now());
insert into pressure (ip, temperature, dia) values ('172.225.106.55', 6, now());
insert into pressure (ip, temperature, dia) values ('172.225.106.55', 5, now());
insert into pressure (ip, temperature, dia) values ('172.225.106.55', 4, now());

insert into humidity (ip, temperature, dia) values ('172.225.106.52', 0, now());
insert into humidity (ip, temperature, dia) values ('172.225.106.52', 1, now());
insert into humidity (ip, temperature, dia) values ('172.225.106.52', 2, now());
insert into humidity (ip, temperature, dia) values ('172.225.106.53', 2, now());
insert into humidity (ip, temperature, dia) values ('172.225.106.53', 5, now());
insert into humidity (ip, temperature, dia) values ('172.225.106.53', 4, now());
insert into humidity (ip, temperature, dia) values ('172.225.106.55', 6, now());
insert into humidity (ip, temperature, dia) values ('172.225.106.55', 5, now());
insert into humidity (ip, temperature, dia) values ('172.225.106.55', 4, now());

insert into memory (ip, total_memory, used_memory, dia) values ('172.225.106.52', 16, 13, now());
insert into memory (ip, total_memory, used_memory, dia) values ('172.225.106.52', 16, 14, now());
insert into memory (ip, total_memory, used_memory, dia) values ('172.225.106.52', 16, 12, now());
insert into memory (ip, total_memory, used_memory, dia) values ('172.225.106.53', 16, 11, now());
insert into memory (ip, total_memory, used_memory, dia) values ('172.225.106.53', 16, 11, now());
insert into memory (ip, total_memory, used_memory, dia) values ('172.225.106.53', 16, 10.9, now());
insert into memory (ip, total_memory, used_memory, dia) values ('172.225.106.55', 16, 3, now());
insert into memory (ip, total_memory, used_memory, dia) values ('172.225.106.55', 16, 3.2, now());
insert into memory (ip, total_memory, used_memory, dia) values ('172.225.106.55', 16, 3.3, now());

insert into cpu (ip, total_cpu, user_cpu, system_cpu, idle_cpu, dia) values ('172.225.106.52', 16, 13, 18, 20, now());
insert into cpu (ip, total_cpu, user_cpu, system_cpu, idle_cpu, dia) values ('172.225.106.52', 16, 14, 18, 20, now());
insert into cpu (ip, total_cpu, user_cpu, system_cpu, idle_cpu, dia) values ('172.225.106.52', 16, 12, 18, 20, now());
insert into cpu (ip, total_cpu, user_cpu, system_cpu, idle_cpu, dia) values ('172.225.106.53', 16, 11, 18, 20, now());
insert into cpu (ip, total_cpu, user_cpu, system_cpu, idle_cpu, dia) values ('172.225.106.53', 16, 11, 18, 20, now());
insert into cpu (ip, total_cpu, user_cpu, system_cpu, idle_cpu, dia) values ('172.225.106.53', 16, 10.9, 18, 20, now());
insert into cpu (ip, total_cpu, user_cpu, system_cpu, idle_cpu, dia) values ('172.225.106.55', 16, 3, 18, 20, now());
insert into cpu (ip, total_cpu, user_cpu, system_cpu, idle_cpu, dia) values ('172.225.106.55', 16, 3.2, 18, 20, now());
insert into cpu (ip, total_cpu, user_cpu, system_cpu, idle_cpu, dia) values ('172.225.106.55', 16, 3.3, 18, 20, now());
