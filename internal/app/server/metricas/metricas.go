package metricas

import (
	"fmt"
	"os"
	"strconv"
	"strings"
	"time"

	controllers "../controllers"
	checklocation "../pkg/getCheckLocationAPI"
	"../pkg/getIp"
	"github.com/mackerelio/go-osstat/cpu"
	"github.com/mackerelio/go-osstat/memory"
)

func SendMetrics(netData string) {
	netData = "26, 18, 12"

	resp := strings.Split(netData, ",")
	t, p, h := resp[0], resp[1], resp[2]
	temperature, pressure, humidity := ConvertStringFloat32(t, p, h)

	ip := getIp.GetIp()
	countryCode, Region, City := checklocation.GetCheckLocationAPI(ip)
	total_cpu, user_cpu, system_cpu, idle_cpu := createMetricsCpu()
	total_memory, used_memory := createMetricsMemory()

	controllers.WriteInDatabase(ip, countryCode, Region, City, temperature, pressure, humidity, total_cpu, user_cpu, system_cpu, idle_cpu, total_memory, used_memory)
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

func ConvertStringFloat32(temperature, pressure, humidity string) (float32, float32, float32) {

	var t, p, h float64

	t, _ = strconv.ParseFloat(temperature, 32)

	p, _ = strconv.ParseFloat(pressure, 32)

	h, _ = strconv.ParseFloat(humidity, 32)

	return float32(t), float32(p), float32(h)
}