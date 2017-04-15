'use strict';

/* This module creates the bot's discord client and logs in, it also handels disconnection/reconnections
and passes all client events to the event handler (client-events.js) */

const clientEvents = require('./client-events.js');
const config = require('../config/config.js');
const Discord = require('discord.js');
const log = require('./logger.js')(module);

let client = null;

/* Global variables for connection control (discord.js has its own client reconnection handling but
it can sometimes fail, particularly when using the optional UWS peer dependency) */
// If the client is currently logging in
let loggingIn = false;
// Timeout after which to consider login failed and  trigger the restart process
let startClock = false;
// Upon disconnect if client doesn't reconnect in time we will take over
let restartClock = null;

module.exports = {
    // Called on bot start, and whenever it is neccesary to restart the bot client
    startup() {
        loggingIn = true;
        setStartClock();

        client = new Discord.Client();

        // Attempt to log the client in
        client.login(config.getConfig().token)
            .then(() => {
                // Successfull log in so clear timers
                clearStartClock();
                clearRestartClock(true);
                log.info('login succesful');
                loggingIn = false;
            })
            .catch(() => {
                log.info('login failed');
                loggingIn = false;
                restart();
            });

        // On webscocket disconnect
        client.on('disconnect', () => {
            clearRestartClock(false);
            log.info('disconnected');
        });

        // Whenever the bot recieves a message from the websocket
        client.on('message', (message) => {
            log.silly('message event');
            clientEvents.message(message);
        });

        // Emitted when the bot client is ready (event emmited on succesful login and reconnections)
        client.on('ready', () => {
            // Successfull log in or reconnection so clear timers
            clearStartClock();
            clearRestartClock(true);

            log.info('ready event');
            clientEvents.ready();
        });

        // On reconnect attempts
        client.on('reconnecting', () => {
            clearRestartClock(false);
            log.debug('reconnect attempt event');
        });

        // Emitted for general warnings
        client.on('warn', (warning) => {
            log.warn(warning);
            clientEvents.warn(warning);
        });
    },
};

// Clear the restart clock, success arguement to indicate if we need to also restart the clock
function clearRestartClock(success) {
    if (restartClock) {
        log.debug('restart clock cleared');
        clearTimeout(restartClock);
        restartClock = null;
    }

    /* If we want to reset the timeout in the case that the client is actually making attempts to reconnect
    a false arguement should be passed */
    if (!success) {
        setRestartClock();
    }
}

// Clear start clock, this will be used upon succesful log in
function clearStartClock() {
    if (startClock) {
        log.debug('start clock cleared');
        clearInterval(startClock);
        startClock = null;
    }
}

/* To be called to either restart the client in the case of failed reconnection handling, or to periodically
make sure that the client is attempting to log in */
function restart() {
    log.verbose('Restart called');
    if (loggingIn) {
        return;
    }
    loggingIn = true;
    if (client.uptime === null) {
        log.info('Client connection failed, attempting to reconnect');
        if (client !== null) {
            client = null;
        }
        module.exports.startup();
    } else {
        log.warn('Client connection handling failed, destroying client, re-attempting connection...');
        client.destroy()
            .then(() => {
                module.exports.startup();
            })
            .catch(() => {
                /* At this point the client has failed to connect, and it has also failed to destroy itself, the
                only remaining recourse is to entirely restart the process */
                process.exit(1);
            });
    }
}

/* Clock to be used when the client is reconnecting, the timeout here is much longer at 60 seconds to
give discord.js's client reconnection handling a chance, every time the client makes some indication
it is at least attempting to reconnect this clock will be restarted. If 60 seconds pass with no indication
then the restart function will take over */
function setRestartClock() {
    if (!restartClock) {
        log.debug('restart clock started');
        restartClock = setTimeout(restart, 60000);
    }
}

/* Start a clock on login attempts, make call restart regularly to make sure the client is attempting to
log in */
function setStartClock() {
    if (!startClock) {
        log.debug('start clock started');
        startClock = setInterval(restart, 3000);
    }
}
