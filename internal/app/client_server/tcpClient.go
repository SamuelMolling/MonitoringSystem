package main

import (
	"bufio"
	"fmt"
	"net"
)

func main() {

	for {

		conexao, err := net.Dial("tcp", "127.0.0.1:1234") //Monta a conexão
		if err != nil {
			fmt.Println(err)
			return
		}
		for i := 0; i < 5; i++ {

			var teste = "12"

			switch i {
			case 0:
				fmt.Fprintf(conexao, teste)
				break
			case 1:
				fmt.Fprintf(conexao, teste)
				break
			case 2:
				fmt.Fprintf(conexao, teste)
				break
			case 3:
				fmt.Fprintf(conexao, teste)
				break
			case 4:
				fmt.Fprintf(conexao, teste)
				break
			}

		}
		message, _ := bufio.NewReader(conexao).ReadString('\n')
		fmt.Print("Message send -> " + message)
	}
}
