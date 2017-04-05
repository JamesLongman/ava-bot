#!/bin/bash

### Move into the docker image's app file we created in the docker file ###
cd app

### Final setup of dependencies ###
echo "Running npm install / prune"
npm install
npm prune

### Setup now complete, attempt to run tests ###
echo "Starting tests!!!"
npm test