'use strict';

/* Master database module, this module is mainly used to redirect to other modules responsible
for handling particular events */

// Ava-data modules
const uptime = require('./ava-data/uptime.js');
// Client event handling modules
const boot = require('./events/boot.js');

module.exports = {
    // Called on first client ready event
    boot(client) {
        uptime.boot();
        boot.execute(client);
    },
};
