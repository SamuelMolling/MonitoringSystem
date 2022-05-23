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
		var texto string
		for i := 0; i < 5; i++ {

			var teste = "12"

			switch i {
			case 0:
				//texto = fmt.Sprintf("%s", teste)
				fmt.Fprintf(conexao, texto)
				//break
			case 1:
				texto = fmt.Sprintf("%s", teste)
				fmt.Fprintf(conexao, texto)
				break
			case 2:
				texto = fmt.Sprintf("%s", teste)
				fmt.Fprintf(conexao, texto)
				break
			case 3:
				texto = fmt.Sprintf("%s", teste)
				fmt.Fprintf(conexao, texto)
				break
			case 4:
				texto = fmt.Sprintf("%s", teste)
				fmt.Fprintf(conexao, texto)
				break
			}

		}
		message, _ := bufio.NewReader(conexao).ReadString('\n')
		fmt.Print("Message send -> " + message)
	}
}
