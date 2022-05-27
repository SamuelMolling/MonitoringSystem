package getmetrics

import (
	"encoding/json"
	"main/pkg/db"
	"net/http"

	"github.com/gorilla/mux"
)

type JsonResponse struct {
	Type        string        `json:"Type,omitempty"`
	Code        int           `json:"Code,omitempty"`
	Pressure    []Pressure    `json:"Pressure,omitempty"`
	Temperature []Temperature `json:"Temperature,omitempty"`
	Memory      []Memory      `json:"Memory,omitempty"`
	Cpu         []Cpu         `json:"Cpu,omitempty"`
	Location    []Location    `json:"Location,omitempty"`
}
type Location struct {
	Ip          string `json:"ip"`
	CountryCode string `json:"countryCode"`
	RegionCode  string `json:"regionCode"`
	City        string `json:"city"`
}

type Temperature struct {
	Id          int     `json:"id"`
	Temperature float32 `json:"temperature"`
	Dia         string  `json:"dia"`
	Ip          string  `json:"ip"`
}
type Pressure struct {
	Id       int     `json:"id"`
	Pressure float32 `json:"pressure"`
	Ip       string  `json:"ip"`
	Dia      string  `json:"dia"`
}
type Memory struct {
	Id           int     `json:"id"`
	Total_memory float32 `json:"total_memory"`
	Used_memory  float32 `json:"used_memory"`
	Dia          string  `json:"dia"`
	Ip           string  `json:"ip"`
}
type Cpu struct {
	Id         int     `json:"id"`
	Total_cpu  float32 `json:"total_cpu"`
	User_cpu   float32 `json:"user_cpu"`
	System_cpu float32 `json:"system_cpu"`
	Idle_cpu   float32 `json:"idle_cpu"`
	Dia        string  `json:"dia"`
	Ip         string  `json:"ip"`
}

func GetMetricsCPU(w http.ResponseWriter, r *http.Request) {
	db := db.ConnectDatabase()

	selectCPU, err := db.Query("select * from cpu")
	if err != nil {
		panic(err.Error())
	}

	p := Cpu{}
	cpu := []Cpu{}

	for selectCPU.Next() {
		var id int
		var total_cpu, user_cpu, system_cpu, idle_cpu float32
		var dia, ip string
		var err = selectCPU.Scan(&id, &ip, &total_cpu, &user_cpu, &system_cpu, &idle_cpu, &dia)
		if err != nil {
			panic(err.Error())
		}

		p.Id = id
		p.Ip = ip
		p.Total_cpu = total_cpu
		p.User_cpu = user_cpu
		p.System_cpu = system_cpu
		p.Idle_cpu = idle_cpu
		p.Dia = dia

		cpu = append(cpu, p)
	}
	defer db.Close()
	var response = JsonResponse{Cpu: cpu}
	json.NewEncoder(w).Encode(response)
}

func GetMetricsMemory(w http.ResponseWriter, r *http.Request) {
	db := db.ConnectDatabase()

	selectmemory, err := db.Query("select * from memory")
	if err != nil {
		panic(err.Error())
	}

	p := Memory{}
	memory := []Memory{}

	for selectmemory.Next() {
		var id int
		var total_memory, used_memory float32
		var dia, ip string
		var err = selectmemory.Scan(&id, &ip, &total_memory, &used_memory, &dia)
		if err != nil {
			panic(err.Error())
		}

		p.Id = id
		p.Ip = ip
		p.Total_memory = total_memory
		p.Used_memory = used_memory
		p.Dia = dia

		memory = append(memory, p)
		memory = append(memory, Memory{Id: id, Total_memory: total_memory / 1000000000, Used_memory: used_memory / 1000000000, Ip: ip, Dia: dia})
	}
	defer db.Close()
	var response = JsonResponse{Memory: memory}
	json.NewEncoder(w).Encode(response)
}

func GetMetricsPressure(w http.ResponseWriter, r *http.Request) {
	db := db.ConnectDatabase()

	selectpressure, err := db.Query("select * from pressure")
	if err != nil {
		panic(err.Error())
	}

	p := Pressure{}
	Pressao := []Pressure{}

	for selectpressure.Next() {
		var id int
		var pressure float32
		var dia, ip string
		var err = selectpressure.Scan(&id, &ip, &pressure, &dia)
		if err != nil {
			panic(err.Error())
		}

		p.Id = id
		p.Ip = ip
		p.Pressure = pressure
		p.Dia = dia

		Pressao = append(Pressao, Pressure{Id: id, Pressure: pressure, Dia: dia, Ip: ip})
	}
	defer db.Close()
	var response = JsonResponse{Pressure: Pressao}
	json.NewEncoder(w).Encode(response)
}

func GetMetricsTemperature(w http.ResponseWriter, r *http.Request) {
	db := db.ConnectDatabase()

	selectTemperature, err := db.Query("select * from temperature")
	if err != nil {
		panic(err.Error())
	}

	p := Temperature{}
	temperatura := []Temperature{}

	for selectTemperature.Next() {
		var id int
		var temperature float32
		var dia, ip string
		var err = selectTemperature.Scan(&id, &ip, &temperature, &dia)
		if err != nil {
			panic(err.Error())
		}

		p.Id = id
		p.Ip = ip
		p.Temperature = temperature
		p.Dia = dia

		temperatura = append(temperatura, Temperature{Id: id, Temperature: temperature, Dia: dia, Ip: ip})
		temperatura = append(temperatura, p)
	}
	defer db.Close()
	var response = JsonResponse{Temperature: temperatura}
	json.NewEncoder(w).Encode(response)
}

func GetMetricsLocation(w http.ResponseWriter, r *http.Request) {
	db := db.ConnectDatabase()

	selectlocation, err := db.Query("select * from locality")
	if err != nil {
		panic(err.Error())
	}

	p := Location{}
	location := []Location{}

	for selectlocation.Next() {
		var ip, regionCode, countryCode, city string
		var err = selectlocation.Scan(&ip, &regionCode, &countryCode, &city)
		if err != nil {
			panic(err.Error())
		}

		p.Ip = ip
		p.RegionCode = regionCode
		p.CountryCode = countryCode
		p.City = city

		location = append(location, Location{Ip: ip, CountryCode: countryCode, RegionCode: regionCode, City: city})
	}
	defer db.Close()
	var response = JsonResponse{Location: location}
	json.NewEncoder(w).Encode(response)
}

func DeletaCPU(w http.ResponseWriter, r *http.Request) {

	params := mux.Vars(r)

	cpuId := params["id"]

	var response = JsonResponse{}

	if cpuId == "" {
		response = JsonResponse{Type: "error", Code: 504}
	} else {
		db := db.ConnectDatabase()

		deleteCpu, err := db.Prepare("delete from cpu where id=$1")
		if err != nil {
			panic(err.Error())
		}
		deleteCpu.Exec(cpuId)
		defer db.Close()
		response = JsonResponse{Type: "success", Code: 200}
	}
	json.NewEncoder(w).Encode(response)
}

func DeletaMemory(w http.ResponseWriter, r *http.Request) {

	params := mux.Vars(r)

	memoryId := params["id"]

	var response = JsonResponse{}

	if memoryId == "" {
		response = JsonResponse{Type: "error", Code: 504}
	} else {
		db := db.ConnectDatabase()

		deletememory, err := db.Prepare("delete from memory where id=$1")
		if err != nil {
			panic(err.Error())
		}
		deletememory.Exec(memoryId)
		defer db.Close()
		response = JsonResponse{Type: "success", Code: 200}
	}
	json.NewEncoder(w).Encode(response)
}

func DeletaPressure(w http.ResponseWriter, r *http.Request) {

	params := mux.Vars(r)

	PressureId := params["id"]

	var response = JsonResponse{}

	if PressureId == "" {
		response = JsonResponse{Type: "error", Code: 504}
	} else {
		db := db.ConnectDatabase()

		deletePressure, err := db.Prepare("delete from Pressure where id=$1")
		if err != nil {
			panic(err.Error())
		}
		deletePressure.Exec(PressureId)
		defer db.Close()
		response = JsonResponse{Type: "success", Code: 200}
	}
	json.NewEncoder(w).Encode(response)
}

func DeletaTemperature(w http.ResponseWriter, r *http.Request) {

	params := mux.Vars(r)

	temperatureId := params["id"]

	var response = JsonResponse{}

	if temperatureId == "" {
		response = JsonResponse{Type: "error", Code: 504}
	} else {
		db := db.ConnectDatabase()

		deletetemperature, err := db.Prepare("delete from temperature where id=$1")
		if err != nil {
			panic(err.Error())
		}
		deletetemperature.Exec(temperatureId)
		defer db.Close()
		response = JsonResponse{Type: "success", Code: 200}
	}
	json.NewEncoder(w).Encode(response)
}
