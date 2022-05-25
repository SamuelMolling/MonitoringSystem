package main

import (
	"bufio"
	"fmt"
	"net"
	"os"
)

func main() {

	// connect to this socket
	conn, _ := net.Dial("tcp", "127.0.0.1:1234")
	for {
		// read in input from stdin
		reader := bufio.NewReader(os.Stdin)
		fmt.Print("Text to send: ")
		text, _ := reader.ReadString('\n')
		// send to socket
		fmt.Fprintf(conn, text+"\n") //T:21.75,P:101535.33 //T:21.74,P:101530.61T:21.74,P:101525.91T:21.75,P:101532.11
	}
}
