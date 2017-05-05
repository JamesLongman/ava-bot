#!/bin/bash

### Move into the docker image's app file we created in the docker file ###
cd app

### Final setup of dependencies ###
echo "Running npm install / prune"
npm install
npm prune

shopt -s globstar

### Setup now complete, attempt to run the main JS file ###
ls
echo "Starting Tests!!!"
./node_modules/istanbul/lib/cli.js --include-all-sources cover ./node_modules/mocha/bin/_mocha -- -R spec ./test/**/*.js

"cat app/coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js"
