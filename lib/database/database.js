'use strict';

/* Master database module, this module is mainly used to redirect to other modules responsible
for handling particular events */

const uptime = require('./ava-data/uptime.js');

module.exports = {
    // Called on first client ready event
    boot() {
        uptime.boot();
    },
};
