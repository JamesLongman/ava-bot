'use strict';

/* This is the config/environment.js file which is the primary config file which holds critical values
such as the bot token and the environment the bot is set to run in */

module.exports = {
    /* Your bot's user ID, shown when you obtained the token, or you can right click on the bot on
    discord and copy its ID directly if you have dev mode enabled in your discord settings*/
    botUserID: false,

    /* The environment is a string, either "development" (for local running), "staging" (for a test server
    hosted version), or "production" (for a live server hosted version) */
    environment: 'testing',

    /* The file path to your project folder ("/app" by default in docker) */
    root: '',

    /* Required
    Your bot token, obtained from: https://discordapp.com/developers/applications/me
    Should be a string, example:."token: 'gh58gjTHjtk5GG5ofdpcmMGU539FC'," */
    token: false,
};
