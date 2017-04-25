'use strict';

/* Module to determine if a server has set a command channel, if so reject commands outside of that
channel */

const log = require('../logger.js')(module);
const servers = require('../botData/servers.js');

const notified = [];

module.exports = {
    execute: function execute(message) {
        const server = servers.getServer(message.guild.id);
        // If a server has a command channel, the command was not posted in it and the channel still exists
        if (server && server.preferences && server.preferences.commandChannel &&
            server.preferences.commandChannel !== message.channel.id
            && message.guild.channels.has(server.preferences.commandChannel)) {
            log.debug('Ignoring command posted outside of command channel');
            notifyUser(message, server.preferences.commandChannel);
            return false;
        }

        // The command can be executed
        return true;
    },
};

// Notify a user that they may only use Ava's commands in the command channel
function notifyUser(message, commandChannel) {
    // If a user has already been notified this session do not notify again so as to reduce spam
    if (notified.indexOf(message.author.id) !== -1) { return false; }
    message.channel.sendMessage(`Sorry ${message.member.displayName}, I've been asked to only ` +
        `accept commands issued in ${message.guild.channels.get(commandChannel)} on this server`)
        .then(log.silly('Notified user of correct command channel'))
        .catch((err) => {
            log.warn(`Failed to notify user, ${err}`);
        });

    notified.push(message.author.id);
    return true;
}
