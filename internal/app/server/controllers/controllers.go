package controllers

import "server/models"

func WriteInDatabase(ip string, total_cpu, user_cpu, system_cpu, idle_cpu, total_memory, used_memory float32) {
	models.InsertMetricsCPU(ip, total_cpu, user_cpu, system_cpu, idle_cpu)
	models.InsertMetricsMemory(ip, total_memory, used_memory)
}

func WriteTemperature(ip string, temperature float32) {
	models.InsertMetricsTemperature(ip, temperature)
}

func WritePressure(ip string, pressure float32) {
	models.InsertMetricsPressure(ip, pressure)
}

func WriteLocation(ip, countryCode, Region, City string) {
	models.InsertMetricsLocation(ip, countryCode, Region, City)

}
