package main

import (
	"fmt"
	"net"
	"time"
)

func main() {
	// config := &serial.Config{
	// 	Name:        "/dev/tty.usbmodem2103",
	// 	Baud:        115200,
	// 	ReadTimeout: 1,
	// 	Size:        8,
	// }

	// stream, err := serial.OpenPort(config)
	// if err != nil {
	// 	log.Fatal(err)
	// }

	// buf := make([]byte, 1024)
	conn, _ := net.Dial("tcp", "localhost:1234")

	for {
		time.Sleep(2 * time.Second)
		// n, _ := stream.Read(buf)
		// s := string(buf[:n])
		s := "T:25.5,P:101302"
		fmt.Fprintf(conn, s+"\n")
		fmt.Println(s)
	}
}
