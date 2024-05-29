# Use a Golang base image
FROM golang:latest

# Set the working directory inside the container
WORKDIR /app

# Copy the Go modules files
COPY go.mod .
COPY go.sum .

# Download Go modules
RUN go mod download

# Copy the entire project into the container
COPY . .

# Build the Go application
RUN go build -o email-service .

# Expose the port that your application listens on
EXPOSE 8080
