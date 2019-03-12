#! /bin/bash
# Run commands

source ./scripts/docker/variables.sh

docker-compose run \
	--rm \
	$APP \
	npm install $1 $2
