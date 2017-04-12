'use strict';

// Module to determine if a message starts with a comand prefix

module.exports = {
    execute: function execute(message) {
        // If the message starts with the default prefix, return true
        if (message.content.startsWith('%')) { return true; }

        // The message does not start with the command prefix so should be ignored
        return false;
    },
};
