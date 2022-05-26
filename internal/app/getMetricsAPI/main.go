package main

import (
	"fmt"
	"log"
	getmetrics "main/pkg/getMetrics"
	"main/utils"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/gofiber/fiber/v2"
)

const idleTimeout = 5 * time.Second

func main() {
	app := fiber.New(fiber.Config{
		IdleTimeout: idleTimeout,
	})

	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Não teste minha paciência!")
	})

	app.Get("/cpu", utils.Cache(10*time.Minute), getmetrics.GetMetricsCPU())
	app.Get("/memory", utils.Cache(10*time.Minute), getmetrics.getMetricsMemory())
	app.Get("/temperature", utils.Cache(10*time.Minute), getmetrics.getMetricsTemperature())
	app.Get("/pressure", utils.Cache(10*time.Minute), getmetrics.getMetricsPressure())
	app.Get("/locality", utils.Cache(10*time.Minute), getmetrics.getMetricsLocality())

	go func() {
		if err := app.Listen(":8080"); err != nil {
			log.Panic(err)
		}
	}()
	c := make(chan os.Signal, 1)
	signal.Notify(c, os.Interrupt, syscall.SIGTERM)

	_ = <-c
	fmt.Println("Gracefully shutting down...")
	_ = app.Shutdown()

	fmt.Println("App was successful shutdown.")
}
