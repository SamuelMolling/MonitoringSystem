package metricas

import (
	"fmt"
	"os"
	"time"

	controllers "../controllers"
	"../pkg/getIp"
	"github.com/mackerelio/go-osstat/cpu"
	"github.com/mackerelio/go-osstat/memory"
)

func SendMetrics(netData string) {

	var temperature, pressure, humidity float32
	//trata
	//temperature, pressure, humidity := netData[]
	ip := getIp.GetIp()
	total_cpu, user_cpu, system_cpu, idle_cpu := createMetricsCpu()
	total_memory, used_memory := createMetricsMemory()

	controllers.WriteInDatabase(ip, temperature, pressure, humidity, total_cpu, user_cpu, system_cpu, idle_cpu, total_memory, used_memory)
}

func createMetricsCpu() (float32, float32, float32, float32) { //Create metrics of Cpu
	before, err := cpu.Get()
	if err != nil {
		fmt.Fprintf(os.Stderr, "%s\n", err)
	}
	time.Sleep(time.Duration(1) * time.Second)
	after, err := cpu.Get()
	if err != nil {
		fmt.Fprintf(os.Stderr, "%s\n", err)
	}
	total := float64(after.Total - before.Total)
	user_cpu := float64(after.User-before.User) / total * 100
	system_cpu := float64(after.System-before.System) / total * 10
	idle_cpu := float64(after.Idle-before.Idle) / total * 100
	return total, user_cpu, system_cpu, idle_cpu
}

func createMetricsMemory() (float32, float32) { //Create metrics of Memory
	memory, err := memory.Get()
	if err != nil {
		fmt.Fprintf(os.Stderr, "%s\n", err)
		os.Exit(-1)
	}
	total_memory := memory.Total
	used_memory := memory.Used
	return float32(total_memory), float32(used_memory)
}
