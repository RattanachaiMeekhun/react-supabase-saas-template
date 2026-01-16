package main

import (
	"context"
	"fmt"
	"log"
	"net/http"

	"github.com/firebase/genkit/go/genkit"
	"github.com/firebase/genkit/go/plugins/server"
)

func main() {
	// Initialize Genkit
	ctx := context.Background()
	g := genkit.Init(ctx)

	// Define a simple cleanData flow that accepts a string and returns a string
	genkit.DefineFlow(g, "cleanData", func(ctx context.Context, input string) (string, error) {
		// Placeholder implementation - just returns the input with a prefix
		result := fmt.Sprintf("Cleaned: %s", input)
		log.Printf("Processing cleanData flow with input: %s", input)
		return result, nil
	})

	log.Println("AI Service with Genkit started successfully")

	// Create HTTP server with flow handlers
	mux := http.NewServeMux()
	for _, action := range genkit.ListFlows(g) {
		mux.HandleFunc("POST /"+action.Name(), genkit.Handler(action))
	}

	// Start the HTTP server on port 8080
	log.Println("Starting server on :8080")
	log.Fatal(server.Start(ctx, ":8080", mux))
}
