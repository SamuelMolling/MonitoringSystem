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
		var texto [5]string
		for i := 0; i < 5; i++ {

			var teste = "12, 14, 15"

			switch i {
			case 0:
				texto[0] = fmt.Sprintf("%s", teste)
				fmt.Fprintf(conexao, texto[0]+"\n")
				break
			case 1:
				texto[1] = fmt.Sprintf("%s", teste)
				fmt.Fprintf(conexao, texto[1]+"\n")
				break
			case 2:
				texto[2] = fmt.Sprintf("%s", teste)
				fmt.Fprintf(conexao, texto[2]+"\n")
				break
			case 3:
				texto[3] = fmt.Sprintf("%s", teste)
				fmt.Fprintf(conexao, texto[3]+"\n")
				break
			case 4:
				texto[4] = fmt.Sprintf("%s", teste)
				fmt.Fprintf(conexao, texto[4]+"\n")
				break
			}

		}
		message, _ := bufio.NewReader(conexao).ReadString('\n')
		fmt.Print("Message send -> " + message)
	}
}
