'use strict';

// Module to handle the %github command, gives link to the project's github repository

const log = require('../../../logger.js')(module);

module.exports = {
    execute: function execute(message) {
        log.verbose(`Called by ${message.member.displayName} (${message.author.id}), on ` +
            `${message.guild.name} (${message.guild.id})`);

        // Respond with invite link
        message.channel.sendMessage('Ava\'s code is 100% open-source, github repository: ' +
            'https://github.com/JamesLongman/ava-bot')
            .then(log.silly('Succesfully sent bot invite link message'))
            .catch((err) => {
                log.warn(`Failed to send bot invite link message, ${err}`);
            });
    },
};
