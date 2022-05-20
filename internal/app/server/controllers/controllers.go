package controllers

import (
	metricas "../metricas"
	models "../models"
	"../pkg/getIp"
)

func OrganizaMetrics(netData string) {
	//tratar metricas
	//metricas.ReveiveMetrics(temperature, pressure, humidity)
	//
	total_cpu, user_cpu, system_cpu, idle_cpu := metricas.CreateMetricsCpu()
	total_memory, used_memory := metricas.CreateMetricsMemory()

	ip := getIp.GetIp()

	models.InsertMetricsTemperature(ip, temperature)
	models.InsertMetricsPressure(ip, pressure)
	models.InsertMetricsHumidity(ip, humidity)
	models.InsertMetricsCPU(ip, total_cpu, user_cpu, system_cpu, idle_cpu)
	models.InsertMetricsMemory(ip, total_memory, used_memory)
}
