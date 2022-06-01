package main

import (
	"fmt"
	"log"
	getmetrics "main/pkg/getMetrics"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/rs/cors"
)

func Cors(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "text/html; charset=ascii")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type,access-control-allow-origin, access-control-allow-headers")
	w.Write([]byte("Hello, World!"))
}

func main() {

	// Init the mux router
	router := mux.NewRouter()

	// Route handles & endpoints

	// Get all metrics for a specific metric

	router.HandleFunc("/api/cpu/get/{id}", getmetrics.GetMetricsCPU).Methods("GET")
	router.HandleFunc("/api/memory/get/{id}", getmetrics.GetMetricsMemory).Methods("GET")
	router.HandleFunc("/api/temperature/get/{id}", getmetrics.GetMetricsTemperature).Methods("GET")
	router.HandleFunc("/api/pressure/get/{id}", getmetrics.GetMetricsPressure).Methods("GET")
	router.HandleFunc("/api/locality/get/{id}", getmetrics.GetMetricsLocation).Methods("GET")

	// Delete a specific metrics by the id
	router.HandleFunc("/api/cpu/delete/{id}", getmetrics.DeletaCPU).Methods("DELETE")
	router.HandleFunc("/api/memorys/delete/{id}", getmetrics.DeletaMemory).Methods("DELETE")
	router.HandleFunc("/api/temperature/delete/{id}", getmetrics.DeletaTemperature).Methods("DELETE")
	router.HandleFunc("/api/pressure/delete/{id}", getmetrics.DeletaPressure).Methods("DELETE")

	// serve the app
	handler := cors.AllowAll().Handler(router)

	fmt.Println("Server at 8000")
	log.Fatal(http.ListenAndServe(":8000", handler))

}
