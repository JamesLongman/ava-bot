FROM node:7.8.0

MAINTAINER James Longman <jameslongman2@gmail.com>

### Add dependencies ###
RUN apt update

### Add bash scripts to docker image ###
# Script to run bot code
ADD docker/run.sh /app/run.sh
# Script to run local tests
ADD docker/test.sh /app/test.sh

### Bundle source files into the docker image's app directory ###
COPY . /app

### Install app dependencies ###
RUN npm install && \
    npm prune
