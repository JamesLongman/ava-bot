'use strict';

/* data.js is used for storing general local data, the data stored here may be mirrored in the database
but also stored locally for quicker access (a good example of this type of data is the preferences
property in the servers.js guild objects). Other examples of types of data stored here are variables
that the entire project may need access to (such as the booted variable where global variables in
modules won't do), or short term data storage in instances where database storage is uneccesary */

let booted = false;
let client = false;
let started = false;

module.exports = {
    getBooted() {
        return booted;
    },

    setBooted() {
        booted = true;
    },

    getClient() {
        return client;
    },

    setClient(clientObject) {
        client = clientObject;
    },

    getStarted() {
        return started;
    },

    setStarted() {
        started = Date.now();
    },
};
