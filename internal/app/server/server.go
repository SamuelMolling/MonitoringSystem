package server

import (
	"bufio"
	"fmt"
	"net"

	metricas "./metricas"
)

func server() {

	l, err := net.Listen("tcp", ":1234") //Listen na porta 1234, usando protocolo tcp
	if err != nil {                      //valida se não deu erro
		fmt.Println(err) //printa o erro caso dê erro
		return
	}
	defer l.Close() //fecha a validação

	c, err := l.Accept() //Aceita conexões
	if err != nil {      //valida se não deu erro
		fmt.Println(err) //printa o erro caso dê erro
		return

	}

	for { //for infinito
		netData, err := bufio.NewReader(c).ReadString('\n') //recebe conexão
		if err != nil {                                     //valida se não deu erro
			fmt.Println(err) //printa o erro caso dê erro
			return
		}
		metricas.SendMetrics(string(netData))
	}
}