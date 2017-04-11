'use strict';

/* This module is the event handler for the bot, client events are passed onto here for reactions to
be sorted */

module.exports = {
    disconnect() {
    },

    message(msg) {
        console.log(`Message recieved: ${msg.content}`);
    },

    ready() {
    },

    reconnecting() {
    },

    warn(warning) {
        console.log(warning);
    },
};
