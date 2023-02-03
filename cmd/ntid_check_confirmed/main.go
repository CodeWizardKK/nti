package main

import (
	"log"

	"github.com/joho/godotenv"

	"nti/internal/check"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	check.CheckIsConfirmed()

}
