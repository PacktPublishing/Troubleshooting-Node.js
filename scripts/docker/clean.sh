#! /bin/bash
# Stop containers and wipe all data
docker-compose stop \
	&& docker-compose rm -fv
