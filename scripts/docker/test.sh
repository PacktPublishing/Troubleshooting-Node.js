#! /bin/bash
# Run commands

source ./scripts/docker/variables.sh

docker-compose run \
	--rm \
	-e NODE_ENV=test \
	$APP \
	npm test
