'use strict';

// Module to handle the %invite command, gives link that will invite bot to a server

const config = require('../../../../config/config.js');
const log = require('../../../logger.js')(module);

module.exports = {
    execute: function execute(message) {
        log.verbose(`Called by ${message.member.displayName} (${message.author.id}), on ` +
            `${message.guild.name} (${message.guild.id})`);

        // Respond with invite link
        message.channel.sendMessage(`To invite me onto a server use this link ${message.member.displayName} ` +
            `https://discordapp.com/api/oauth2/authorize?client_id=${config.getConfig().botUserID}` +
            '&scope=bot&permissions=8')
            .then(log.silly('Succesfully sent bot invite link message'))
            .catch((err) => {
                log.warn(`Failed to send bot invite link message, ${err}`);
            });
    },
};
