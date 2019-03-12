#! /bin/bash
# Wipe all current data and containers; build new ones
source ./scripts/docker/variables.sh

./scripts/docker/clean.sh \
	&& docker-compose up
