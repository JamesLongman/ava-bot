'use strict';

// Module to handle the !ping command, replies with pingtime

const log = require('../../../logger.js')(module);

module.exports = {
    execute: function execute(message) {
        log.info(`Called by ${message.member.displayName} (${message.author.id}), on ${message.guild.name}` +
            ` (${message.guild.id})`);

        // Firstly we will need to send a response to the original command
        message.channel.sendMessage('pong')
            .then((secondMessage) => {
                console.log(`resolved: ${secondMessage}`);
                log.debug('Succesfully sent pong message');
                editPong(message, secondMessage);
            })
            .catch((err) => {
                log.warn(`Failed to send pong message, ${err}`);
            });
    },
};

/* After the "pong" response has succesfully sent we will use the difference in discord timestamps of
the messages to calculate pingtime */
function editPong(message, secondMessage) {
    // Calculate pingtime in milliseconds
    const ms = secondMessage.createdTimestamp - message.createdTimestamp;

    // Determine the status of the pingtime
    let status = '';
    if (ms < 50) {
        status = '(Excellent)';
    } else if (ms < 100) {
        status = '(Very Good)';
    } else if (ms < 300) {
        status = '(Good)';
    } else if (ms < 1000) {
        status = '(Mediocre)';
    } else {
        status = '(Bad)';
    }

    // Edit the reply from "pong" to the !ping response message
    secondMessage.edit(`Ping: ${ms}ms ${status}`)
        .then(() => {
            log.debug('Succesfully editted pong message, !ping complete');
        })
        .catch((err) => {
            log.warn(`Failed to edit pong message, ${err}`);
        });
}
