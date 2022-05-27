package main

import (
	"fmt"
	"log"
	"net"
	"time"

	"github.com/tarm/serial"
)

func main() {
	config := &serial.Config{
		Name:        "/dev/tty.usbmodem2103",
		Baud:        115200,
		ReadTimeout: 1,
		Size:        8,
	}

	stream, err := serial.OpenPort(config)
	if err != nil {
		log.Fatal(err)
	}

	buf := make([]byte, 1024)
	conn, _ := net.Dial("tcp", "127.0.0.1:1234")

	for {
		time.Sleep(2 * time.Second)
		n, _ := stream.Read(buf)
		s := string(buf[:n])
		fmt.Fprintf(conn, s+"\n")
		fmt.Println(s)
	}
}