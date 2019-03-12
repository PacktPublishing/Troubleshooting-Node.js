#! /bin/bash
# Build new image
source ./scripts/docker/variables.sh

docker build -t $BASE_IMAGE -f ./scripts/docker/Dockerfile .
