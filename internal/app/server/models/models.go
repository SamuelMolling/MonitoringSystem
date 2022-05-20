package models

import (
	"time"

	"../db"
)

type Location struct {
	ip          string
	countryCode string
	regionCode  string
	city        string
}

type Temperature struct {
	Id          int
	temperature float32
	dia         string
	location    *Location
}

type Pressure struct {
	Id       int
	pressure float32
	dia      string
	location *Location
}

type Memory struct {
	Id           int
	total_memory float32
	used_memory  float32
	dia          string
	location     *Location
}

type Cpu struct {
	Id         int
	total_cpu  float32
	user_cpu   float32
	system_cpu float32
	idle_cpu   float32
	dia        string
	location   *Location
}

func InsertMetricsCPU(ip string, total_cpu, user_cpu, system_cpu, idle_cpu float32) {
	db := db.ConnectDatabase()

	insertCPU, err := db.Prepare("insert into app.cpu(ip, total_cpu, user_cpu, system_cpu, idle_cpu, dia) values($1, $2, $3, $4, $5, %6)")
	if err != nil {
		panic(err.Error())
	}

	insertCPU.Exec(ip, total_cpu, user_cpu, system_cpu, idle_cpu, time.Now())
	defer db.Close()

}

func InsertMetricsMemory(ip string, total_memory, used_memory float32) {
	db := db.ConnectDatabase()

	insertMemory, err := db.Prepare("insert into app.memory(ip, total_memory, used_memory, dia) values($1, $2, $3, $4)")
	if err != nil {
		panic(err.Error())
	}

	insertMemory.Exec(ip, total_memory, used_memory, time.Now())
	defer db.Close()

}

func InsertMetricsTemperature(ip string, temperature float32) {
	db := db.ConnectDatabase()

	insertTemperature, err := db.Prepare("insert into app.temperature(ip, temperature, dia) values($1, $2, $3)")
	if err != nil {
		panic(err.Error())
	}

	insertTemperature.Exec(ip, temperature, time.Now())
	defer db.Close()

}

func InsertMetricsPressure(ip string, pressure float32) {
	db := db.ConnectDatabase()

	insertPressure, err := db.Prepare("insert into app.pressure(ip, pressure, dia) values($1, $2, $3)")
	if err != nil {
		panic(err.Error())
	}

	insertPressure.Exec(ip, pressure, time.Now())
	defer db.Close()

}

func InsertMetricsHumidity(ip string, humidity float32) {
	db := db.ConnectDatabase()

	insertHumidity, err := db.Prepare("insert into app.humidity(ip, humidity, dia) values($1, $2, $3)")
	if err != nil {
		panic(err.Error())
	}

	insertHumidity.Exec(ip, humidity, time.Now())
	defer db.Close()
}
