# Stage 1: Build
FROM golang:1.23-alpine AS builder

# Install ca-certificates and update them for HTTPS downloads
RUN apk add --no-cache ca-certificates && update-ca-certificates

WORKDIR /app

# Copy go.mod and go.sum files
COPY go.mod go.sum* ./

# Download dependencies with automatic toolchain upgrade
RUN GOTOOLCHAIN=auto go mod download

# Copy source code
COPY . .

# Build the binary
RUN GOTOOLCHAIN=auto CGO_ENABLED=0 GOOS=linux go build -o main .

# Stage 2: Run
FROM alpine:latest

WORKDIR /app

# Copy the binary from builder
COPY --from=builder /app/main .

# Expose port 8080
EXPOSE 8080

# Run the application
CMD ["./main"]
