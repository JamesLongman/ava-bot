'use strict';

/* Module to handle the initial setup of servers.js, loops through guilds the client is on and stores them
in the servers.js object */

const bootProcess = require('../bootProcess');
const servers = require('./servers.js');

module.exports = {
    execute(client) {
        for (const guild of client.guilds) {
            servers.setServer(guild[1].id, { configs: false, guild: guild[1] });
        }
        bootProcess.serversAssemblyComplete();
    },
};
