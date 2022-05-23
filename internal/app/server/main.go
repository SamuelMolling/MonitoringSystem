package main

import (
	"bufio"
	"fmt"
	"net"
	"server/metricas"
)

func main() {

	l, err := net.Listen("tcp", ":1234") //Listen na porta 1234, usando protocolo tcp
	if err != nil {                      //valida se não deu erro
		fmt.Println(err) //printa o erro caso dê erro
		return
	}
	defer l.Close() //fecha a validação

	c, err := l.Accept() //Aceita conexões
	if err != nil {      //valida se não deu erro
		fmt.Println(err) //printa o erro caso dê errogo
		return

	}

	for { //for infinito
		netData, err := bufio.NewReader(c).ReadString('\n') //recebe conexão
		if err != nil {                                     //valida se não deu erro
			fmt.Println(err) //printa o erro caso dê erro
			return
		}
		println(netData)

		metricas.SendMetrics(string(netData))
		println("ok")

	}
}
