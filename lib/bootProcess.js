'use strict';

/* Master module to control the boot process, some features of the bot will be reliant on certain tasks
that should be performed during or before the first client.ready event (a good example is that the
commands prefix module needs the command prefixes for servers to be pulled from the database
before it can function). This module will monitor the progress of the boot and when it is complete
will set the bot as booted in servers.js */

const log = require('./logger.js')(module);
const data = require('./botData/data.js');

const progress = {
    configs: false,
    reconciliation: false,
    servers: false,
};

module.exports = {
    // Database reconciliation performed in database/events/boot.js
    reconciliationComplete() {
        progress.reconciliation = true;
        log.info('Database reconciliation completed');
        checkProgress();
    },

    serversAssemblyComplete() {
        progress.servers = true;
        log.info('Servers.js object assembly completed');
        checkProgress();
    },

    serversConfigsComplete() {
        progress.configs = true;
        log.info('Servers.js object configs pulled from database');
        checkProgress();
    },
};

// Checks the progressof the boot whenever a task is completed, informs servers.js upon full boot
function checkProgress() {
    for (const x in progress) {
        if (!progress[x]) { return false; }
    }
    log.info('Full boot process completed');
    data.setBooted();
    return true;
}
