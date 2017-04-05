FROM node:7.8.0
MAINTAINER James Longman <jameslongman2@gmail.com>

### Add dependencies ###
RUN apt update

### Add bash script to Docker image ###
ADD docker/run.sh /app/run.sh

### Bundle source files into the Docker image's app directory ###
COPY . /app