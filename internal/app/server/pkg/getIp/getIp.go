package getIp

import (
	"io/ioutil"
	"log"
	"net/http"
)

func GetIp() string {
	const Url = "http://checkip.amazonaws.com/"

	response, err := http.Get(Url)

	if err != nil {
		log.Fatal(err.Error())
	}

	defer response.Body.Close()

	body, _ := ioutil.ReadAll(response.Body)

	return string(body)
}
