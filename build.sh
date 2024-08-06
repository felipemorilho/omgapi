#!/bin/bash

# Build the Docker image
docker build -t omgapi .

# Save the Docker image to a tar file
docker save omgapi > omgapi.tar

# Extract the contents of the tar file to the public directory
mkdir -p public
tar -xf omgapi.tar -C public