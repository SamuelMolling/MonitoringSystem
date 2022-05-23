package getCheckLocationAPI

import (
	"encoding/json"
	"io/ioutil"
	"log"
	"net/http"
)

type Response struct { //https://mholt.github.io/json-to-go/
	CountryCode string `json:"countryCode"`
	Region      string `json:"region"`
	City        string `json:"city"`
}

func GetCheckLocationAPI(ip string) (string, string, string) {
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
