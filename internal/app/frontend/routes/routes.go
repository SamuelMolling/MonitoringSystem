package routes

import (
	"net/http"

	"../controllers"
)

func CarregaRotas() {
	http.HandleFunc("/", controllers.Index)
	http.HandleFunc("/delete", controllers.Delete)
	http.HandleFunc("/update", controllers.Update)
}
