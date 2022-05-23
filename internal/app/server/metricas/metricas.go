package metricas

import (
	"fmt"
	"log"
	"os"
	"server/controllers"
	checklocation "server/pkg/getCheckLocationAPI"
	"server/pkg/getIp"
	"strconv"
	"strings"
	"time"

	"github.com/mackerelio/go-osstat/cpu"
	"github.com/mackerelio/go-osstat/memory"
)

func SendMetrics(netData string) {
	//netData = "26,18,12"

	resp := strings.Split(netData, ",")
	t, p, h := resp[0], resp[1], resp[2]
	t = strings.TrimSpace(t)
	p = strings.TrimSpace(p)
	h = strings.TrimSpace(h)
	temperature, pressure, humidity := ConvertStringFloat32(t, p, h)

	ip := getIp.GetIp()

	ip = strings.TrimSpace(ip) //remove o '\n'

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
	total := float32(after.Total - before.Total)
	user_cpu := float32(after.User-before.User) / total * 100
	system_cpu := float32(after.System-before.System) / total * 10
	idle_cpu := float32(after.Idle-before.Idle) / total * 100
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

	t, err := strconv.ParseFloat(temperature, 32)
	if err != nil {
		log.Println("Converting error of temperature:", err)
	}

	p, err = strconv.ParseFloat(pressure, 32)
	if err != nil {
		log.Println("Converting error of pressure:", err)
	}

	h, err = strconv.ParseFloat(humidity, 32)
	if err != nil {
		log.Println("Converting error of humidity:", err)
	}

	return float32(t), float32(p), float32(h)
}
