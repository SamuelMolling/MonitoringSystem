package controllers

import (
	models "../models"
)

func WriteInDatabase(ip, countryCode, Region, City string, temperature, pressure, humidity, total_cpu, user_cpu, system_cpu, idle_cpu, total_memory, used_memory float32) {
	models.InsertMetricsLocation(ip, countryCode, Region, City)
	models.InsertMetricsTemperature(ip, temperature)
	models.InsertMetricsPressure(ip, pressure)
	models.InsertMetricsHumidity(ip, humidity)
	models.InsertMetricsCPU(ip, total_cpu, user_cpu, system_cpu, idle_cpu)
	models.InsertMetricsMemory(ip, total_memory, used_memory)
}
