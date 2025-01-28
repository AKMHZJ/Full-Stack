package main

import (
	"./config"
	"./routes"
	"log"
	"net/http"
)

func main() {
	// Initialize database
	err := config.InitDB()
	if err != nil {
		log.Fatal("Error initializing database:", err)
	}

	// Initialize routes
	router := routes.SetupRoutes()

	// Start server
	log.Println("Server starting on http://localhost:8080")
	err = http.ListenAndServe(":8080", router)
	if err != nil {
		log.Fatal("Error starting server:", err)
	}
}
