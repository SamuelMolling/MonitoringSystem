package metricas

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"time"

	controllers "../controllers"
	"../pkg/getIp"
	"github.com/mackerelio/go-osstat/cpu"
	"github.com/mackerelio/go-osstat/memory"
)

type Response struct { //https://mholt.github.io/json-to-go/
	CountryCode string `json:"countryCode"`
	Region      string `json:"region"`
	City        string `json:"city"`
}

func SendMetrics(netData string) {
	netData = "26, 18, 12"
	var temperature, pressure, humidity float32
	//netData
	//temperature, pressure, humidity := netData[]
	ip := getIp.GetIp()

	countryCode, Region, City := getCheckLocationAPI(ip)

	total_cpu, user_cpu, system_cpu, idle_cpu := createMetricsCpu()
	total_memory, used_memory := createMetricsMemory()

	controllers.WriteInDatabase(ip, temperature, pressure, humidity, total_cpu, user_cpu, system_cpu, idle_cpu, total_memory, used_memory, countryCode, Region, City)
}

func getCheckLocationAPI(ip string) (string, string, string) {
	const Url = "http://127.0.0.1:3005/geo/"

	resp, err := http.Get(Url + ip)

	if err != nil {
		log.Fatal(err.Error())
	}

	defer resp.Body.Close()

	body, _ := ioutil.ReadAll(resp.Body)

	if err != nil {
		log.Fatal(err)
	}

	var response Response
	json.Unmarshal(body, &response)

	return response.CountryCode, response.Region, response.City
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
