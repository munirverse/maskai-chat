#!/bin/sh

if [ -f .env ]; then
    echo ".env files found, continue to next process..."
else
    cp .env.example .env
    echo "new .env file created, continue to next process..."
fi

docker-compose build 
docker-compose up -d --wait