package db

import (
	"database/sql"
)

func ConnectDatabase() *sql.DB {
	conexao := "user=app dbname=system_monitoring password=app host=127.0.0.1 sslmode=disable"
	db, err := sql.Open("postgres", conexao)
	if err != nil {
		panic(err.Error())
	}
	return db
}
