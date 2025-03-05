#!/bin/bash

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "Error: Docker is not installed. Please install Docker first."
    exit 1
fi

echo "Docker is installed, proceeding with the script..."


docker build . --tag=cs4050-backend

docker run -p 8080:8080 --rm cs4050-backend