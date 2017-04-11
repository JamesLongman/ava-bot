'use strict';

/* This is the primary module of the Ava bot, if you are not using docker to run the bot you can
use another method to run this file as long as you make sure you have the correct dependencies */

const bot = require('./bot.js');

console.log('======== ava.js running ========');

// This step serves the important purpose of allowing a specific function to be called to start the bot
bot.startup();
