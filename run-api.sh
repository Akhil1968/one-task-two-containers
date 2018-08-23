#!/usr/bin/env bash

echo "Launching Sample Service..."
docker run --tty \
           --interactive \
           --rm \
           --link redis:redis \
           --publish 8080:8080 \
           --name "db" \
           db:v1
