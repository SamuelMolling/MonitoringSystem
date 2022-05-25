package metricas

import (
	"fmt"
	"log"
	"os"
	"regexp"
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
	ip := getIp.GetIp()
	ip = strings.TrimSpace(ip)
	countryCode, Region, City := checklocation.GetCheckLocationAPI(ip)
	controllers.WriteLocation(ip, countryCode, Region, City)

	//netData = "T:21.74,P:101530.61T:21.76,P:101525.91T:21.75,P:101532.11"
	resp := strings.Split(netData, ",")
	for i := 0; i < len(resp); i++ {
		matched, _ := regexp.MatchString("^T", resp[i])
		if matched {
			t := resp[i]
			t = strings.TrimSpace(t)
			t = strings.TrimPrefix(t, "T:")
			temp := strings.Split(t, "P")
			for i := 0; i < len(temp); i++ {
				t = temp[i]
				itsPressure, _ := regexp.MatchString("^:", temp[i])
				if itsPressure {
					p := strings.TrimPrefix(temp[i], ":")
					pressure := ConvertStringFloat32(p)
					controllers.WritePressure(ip, pressure)
					continue
				} else {
					t = temp[i]
				}
			}
			t = strings.TrimSpace(t)
			temperature := ConvertStringFloat32(t)
			println("T:", temperature)
			controllers.WriteTemperature(ip, temperature)
		} else {
			p := resp[i]
			p = strings.TrimSpace(p)
			p = strings.TrimPrefix(p, "P:")
			temp := strings.Split(p, "T")
			for i := 0; i < len(temp); i++ {
				p = temp[i]
				itsTemperature, _ := regexp.MatchString("^:", temp[i])
				if itsTemperature {
					t := strings.TrimPrefix(temp[i], ":")
					temperature := ConvertStringFloat32(t)
					controllers.WriteTemperature(ip, temperature)
					continue
				} else {
					p = temp[i]
				}
			}
			p = strings.TrimSpace(p)
			pressure := ConvertStringFloat32(p)
			controllers.WritePressure(ip, pressure)
		}
	}
	total_cpu, user_cpu, system_cpu, idle_cpu := createMetricsCpu()
	total_memory, used_memory := createMetricsMemory()
	controllers.WriteInDatabase(ip, total_cpu, user_cpu, system_cpu, idle_cpu, total_memory, used_memory)
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

func ConvertStringFloat32(text string) float32 {

	var temp float64

	temp, err := strconv.ParseFloat(text, 32)
	if err != nil {
		log.Println("Converting error: ", err)
	}

	return float32(temp)
}
