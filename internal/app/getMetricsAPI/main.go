package main

import (
	"fmt"
	"log"
	getmetrics "main/pkg/getMetrics"
	"net/http"

	"github.com/gorilla/mux"
)

func main() {

	// Init the mux router
	router := mux.NewRouter()

	// Route handles & endpoints

	// Get all metrics for a specific metric
	router.HandleFunc("/api/cpu/get", getmetrics.GetMetricsCPU).Methods("GET")
	router.HandleFunc("/api/memory/get", getmetrics.GetMetricsMemory).Methods("GET")
	router.HandleFunc("/api/temperature/get", getmetrics.GetMetricsTemperature).Methods("GET")
	router.HandleFunc("/api/pressure/get", getmetrics.GetMetricsPressure).Methods("GET")
	router.HandleFunc("/api/locality/get", getmetrics.GetMetricsLocation).Methods("GET")

	// Delete a specific metrics by the id
	router.HandleFunc("/api/cpu/delete/{id}", getmetrics.DeletaCPU).Methods("DELETE")
	router.HandleFunc("/api/memorys/delete/{id}", getmetrics.DeletaMemory).Methods("DELETE")
	router.HandleFunc("/api/temperature/delete/{id}", getmetrics.DeletaTemperature).Methods("DELETE")
	router.HandleFunc("/api/pressure/delete/{id}", getmetrics.DeletaPressure).Methods("DELETE")

	// serve the app
	fmt.Println("Server at 8000")
	log.Fatal(http.ListenAndServe(":8000", router))

}
