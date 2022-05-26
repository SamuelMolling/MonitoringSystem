package getmetrics

import (
	"errors"
	"main/pkg/db"
	"net"
	"time"

	"github.com/gofiber/fiber"
	"github.com/valyala/fasthttp"
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
	ip          string
}

type Pressure struct {
	Id       int
	pressure float32
	dia      string
	ip       string
}

type Memory struct {
	Id           int
	total_memory float32
	used_memory  float32
	dia          string
	ip           string
}

type Cpu struct {
	Id         int
	total_cpu  float32
	user_cpu   float32
	system_cpu float32
	idle_cpu   float32
	dia        string
	ip         string
}

func Teste() fiber.Handler {
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
		var err = selectCPU.Scan(&id, &total_cpu, &user_cpu, &system_cpu, &idle_cpu, &dia, &ip)
		if err != nil {
			panic(err.Error())
		}

		p.Id = id
		p.total_cpu = total_cpu
		p.user_cpu = user_cpu
		p.system_cpu = system_cpu
		p.idle_cpu = idle_cpu
		p.dia = dia
		p.ip = ip

		cpu = append(cpu, p)
	}
	defer db.Close()
	return c.Status(200).JSON(map[string]string{"Id": "error", "message": "Invalid IP address"})

}

func GetGeo() fiber.Handler {
	client := fasthttp.Client{}
	return func(c *fiber.Ctx) error {

		ip := c.Params("ip", c.IP())

		if net.ParseIP(ip) == nil {
			return c.Status(400).JSON(map[string]string{"status": "error", "message": "Invalid IP address"})
		}

		fields := c.Params("fields")
		req := fasthttp.AcquireRequest()
		res := fasthttp.AcquireResponse()
		defer fasthttp.ReleaseRequest(req)
		defer fasthttp.ReleaseResponse(res)

		req.SetRequestURI("http://ip-api.com/json/" + ip + "?" + fields)

		if err := client.DoTimeout(req, res, 30*time.Second); err != nil {
			return err
		}

		if res.StatusCode() != fiber.StatusOK {
			return errors.New("invalid statuscode")
		}

		c.Set(fiber.HeaderContentType, fiber.MIMEApplicationJSONCharsetUTF8)

		return c.Send(res.Body())
	}
}

func GetMetricsCPU() []Cpu {
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
		var err = selectCPU.Scan(&id, &total_cpu, &user_cpu, &system_cpu, &idle_cpu, &dia, &ip)
		if err != nil {
			panic(err.Error())
		}

		p.Id = id
		p.total_cpu = total_cpu
		p.user_cpu = user_cpu
		p.system_cpu = system_cpu
		p.idle_cpu = idle_cpu
		p.dia = dia
		p.ip = ip

		cpu = append(cpu, p)
	}
	defer db.Close()
	return cpu
}

func GetMetricsMemory() []Memory {
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
		var err = selectmemory.Scan(&id, &total_memory, &used_memory, &dia, &ip)
		if err != nil {
			panic(err.Error())
		}

		p.Id = id
		p.total_memory = total_memory
		p.used_memory = used_memory
		p.dia = dia
		p.ip = ip

		memory = append(memory, p)
	}
	defer db.Close()
	return memory
}

func GetMetricsPressure() []Pressure {
	db := db.ConnectDatabase()

	selectpressure, err := db.Query("select * from pressure")
	if err != nil {
		panic(err.Error())
	}

	p := Pressure{}
	pressure := []Pressure{}

	for selectpressure.Next() {
		var id int
		var pressure float32
		var dia, ip string
		var err = selectpressure.Scan(&id, &pressure, &dia, &ip)
		if err != nil {
			panic(err.Error())
		}

		p.Id = id
		p.pressure = pressure
		p.dia = dia
		p.ip = ip

		pressure = append(pressure, p)
	}
	defer db.Close()
	return pressure
}

func GetMetricsTemperature() []Temperature {
	db := db.ConnectDatabase()

	selectTemperature, err := db.Query("select * from temperature")
	if err != nil {
		panic(err.Error())
	}

	p := Temperature{}
	temperature := []Temperature{}

	for selectTemperature.Next() {
		var id int
		var temperature float32
		var dia, ip string
		var err = selectTemperature.Scan(&id, &temperature, &dia, &ip)
		if err != nil {
			panic(err.Error())
		}

		p.Id = id
		p.temperature = temperature
		p.dia = dia
		p.ip = ip

		temperature = append(temperature, p)
	}
	defer db.Close()
	return temperature
}

func DeletaCPU(id string) {
	db := db.ConnectDatabase()

	deleteCpu, err := db.Prepare("delete from cpu where id=$1")
	if err != nil {
		panic(err.Error())
	}

	deleteCpu.Exec(id)
	defer db.Close()
}

func DeletaMemory(id string) {
	db := db.ConnectDatabase()

	deleteMemory, err := db.Prepare("delete from memory where id=$1")
	if err != nil {
		panic(err.Error())
	}

	deleteMemory.Exec(id)
	defer db.Close()
}

func DeletaPressure(id string) {
	db := db.ConnectDatabase()

	deletePressure, err := db.Prepare("delete from pressure where id=$1")
	if err != nil {
		panic(err.Error())
	}

	deletePressure.Exec(id)
	defer db.Close()
}

func DeletaTemperature(id string) {
	db := db.ConnectDatabase()

	deleteTemperature, err := db.Prepare("delete from temperature where id=$1")
	if err != nil {
		panic(err.Error())
	}

	deleteTemperature.Exec(id)
	defer db.Close()

}
