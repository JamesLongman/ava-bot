'use strict';

// Module to determine if a message starts with a comand prefix

const config = require('../../config/config.js');
const servers = require('../botData/servers.js');


module.exports = {
    execute: function execute(message) {
        // If the guild has custom preferences we will use them, else pull from default preferences
        let preferences = servers.getServer(message.guild.id).preferences;
        if (!preferences) { preferences = config.getConfig().preferences; }


        // If the message starts with the default prefix, return true
        if (message.content.startsWith(preferences.prefix)) { return true; }

        // The message does not start with the command prefix so should be ignored
        return false;
    },
};
