package metrics

import (
	"fmt"
	"os"
	"time"

	"github.com/mackerelio/go-osstat/cpu"
	"github.com/mackerelio/go-osstat/memory"
)

func CreateMetricsCpu() (float64, float64, float64) { //Create metrics of Cpu
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
	return user_cpu, system_cpu, idle_cpu
}

func CreateMetricsMemory() (uint64, uint64) { //Create metrics of Memory
	memory, err := memory.Get()
	if err != nil {
		fmt.Fprintf(os.Stderr, "%s\n", err)
		os.Exit(-1)
	}
	total_memory := memory.Total
	used_memory := memory.Used
	return total_memory, used_memory
}