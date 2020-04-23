#! /bin/bash

IMAGE=$1
TAG=$2
NAME=$3
docker ps | grep $NAME | awk '{print $1}' | xargs docker stop
docker pull $IMAGE:$TAG
docker rm $NAME
docker run -p 3000:80 -d --name $NAME $IMAGE:$TAG


