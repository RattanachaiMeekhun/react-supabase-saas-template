# AI Service - Genkit & Go Microservice

This is an AI processing microservice built with Firebase Genkit and Go, designed to handle AI-powered data processing tasks.

## Overview

The AI service provides a RESTful API interface for AI processing workflows using Firebase Genkit. Currently, it includes a placeholder `cleanData` flow that demonstrates the basic structure.

## Features

- **Genkit Framework**: Built on Firebase Genkit for AI-powered workflows
- **Go Runtime**: High-performance Go-based microservice
- **RESTful API**: HTTP endpoints for flow execution
- **Docker Support**: Multi-stage Docker build for production deployment
- **Port 8080**: Listens on port 8080 for incoming requests

## Project Structure

```
ai-service/
├── main.go        # Main application entry point
├── go.mod         # Go module definition
├── go.sum         # Go dependencies checksums
├── Dockerfile     # Multi-stage Docker build configuration
└── README.md      # This file
```

## Prerequisites

- Go 1.24+ (Genkit requires Go 1.24.1 or later)
- Docker (for containerized deployment)

## Local Development

### Build and Run Locally

```bash
# Install dependencies
go mod download

# Run the service
go run main.go
```

The service will start on `http://localhost:8080`

### Build Binary

```bash
go build -o main .
./main
```

## Docker Deployment

### Build Docker Image

```bash
docker build -t ai-service:latest .
```

### Run Docker Container

```bash
docker run -p 8080:8080 ai-service:latest
```

## API Endpoints

### cleanData Flow

**Endpoint**: `POST /cleanData`

**Description**: A placeholder flow that demonstrates data cleaning. Currently returns the input with a "Cleaned: " prefix.

**Request Body** (JSON):
```json
{
  "data": {
    "input": "your data here"
  }
}
```

**Example using curl**:
```bash
curl -X POST http://localhost:8080/cleanData \
  -H "Content-Type: application/json" \
  -d '{"data": {"input": "test data"}}'
```

## Architecture

### Multi-Stage Docker Build

The Dockerfile uses a multi-stage build approach:

1. **Build Stage** (`golang:1.23-alpine`):
   - Installs dependencies
   - Downloads Go toolchain if needed (Genkit requires Go 1.24+)
   - Compiles the Go application
   - Produces a static binary

2. **Runtime Stage** (`alpine:latest`):
   - Minimal Alpine Linux image
   - Copies only the compiled binary
   - Exposes port 8080
   - Runs the application

This approach results in a small, secure production image.

## Extending the Service

### Adding New Flows

To add new AI flows, define them in `main.go`:

```go
genkit.DefineFlow(g, "yourFlowName", func(ctx context.Context, input YourInputType) (YourOutputType, error) {
    // Your flow logic here
    return output, nil
})
```

### Integrating AI Models

To integrate AI models (e.g., Google AI, OpenAI), add the appropriate Genkit plugins:

```go
import (
    "github.com/firebase/genkit/go/plugins/googlegenai"
)

func main() {
    ctx := context.Background()
    g := genkit.Init(ctx,
        genkit.WithPlugins(&googlegenai.GoogleAI{}),
        genkit.WithDefaultModel("googleai/gemini-2.5-flash"),
    )
    // ... rest of your code
}
```

## Environment Variables

Currently, no environment variables are required. When integrating with AI providers, you may need:

- `GOOGLE_API_KEY` - For Google AI integration
- `OPENAI_API_KEY` - For OpenAI integration
- `GENKIT_ENV` - Set to `dev` for development mode with reflection API

## Development Tools

### Genkit Developer UI

In development mode, you can use the Genkit Developer UI:

```bash
# Set environment variable
export GENKIT_ENV=dev

# Run your service
go run main.go

# In another terminal, start the Dev UI
npx genkit start -- go run main.go
```

## Security Considerations

- The service uses a static binary with `CGO_ENABLED=0` for better security
- Runs in a minimal Alpine Linux container
- No sensitive data is logged by default
- Add authentication/authorization as needed for production use

## Troubleshooting

### Go Version Issues

If you encounter Go version errors, ensure you have Go 1.24+ installed or use Docker to build:

```bash
docker build -t ai-service:latest .
```

The Dockerfile handles automatic toolchain downloads.

### Network Issues During Docker Build

If you encounter TLS certificate errors during the Docker build, ensure your Docker daemon has proper network access and CA certificates are configured correctly.

## Future Enhancements

- Add more AI processing flows
- Integrate with Google AI / OpenAI models
- Add authentication and rate limiting
- Implement request validation and error handling
- Add observability and tracing
- Create integration tests
- Add CI/CD pipeline configuration

## License

This service is part of the react-supabase-saas-template project.
