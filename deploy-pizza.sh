#! /bin/bash

IMAGE=$1
TAG=$2
NAME=$3
docker ps | grep $NAME | awk '{print $1}' | xargs docker stop
docker pull $IMAGE:$TAG
docker rm $NAME
<<<<<<< HEAD
docker run -p 3000:80 -d --name $NAME $IMAGE:$TAG
=======
docker run -p 3000:80 -d --name $NAME $IMAGE:$TAG
>>>>>>> c30d950a78223c22e0063b44072fb2b257f36515
