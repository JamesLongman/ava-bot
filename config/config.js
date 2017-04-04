'use strict';

/* Primary config module, using getters and setters this module can alter the config
and pull valuesfrom other files */

const envConfig = require('./environment.js');

// Require enviroment first so we are able to use environment specific configs
const environment = envConfig.environment;

let config = {
    // Enviroment configs
    botUserID: envConfig.botUserID, // The user ID of the bot
    token: envConfig.token, // Bot token

    // General Configs
    environment: environment, // Environment (production, staging or testing)
    testing: false, // If the bot is being tested (used very sparingly to not comprimise test validity)
};

module.exports = {
    // Getter function to pass the entire config object
    getConfig: function () {
        if (config) {
            return config;
        } else {
            return false;
        }
    },

    // Setter function for when we would like to set the value of the entire config
    setConfig: function (newConfig) {
        if (newConfig !== undefined) {
            config = newConfig;
            return true;
        } else {
            return false;
        }
    },

    // Setter function for when we would like to set the value of a specific config property
    setConfigProperty: function (property, value) {
        if (property !== undefined && value !== undefined) {
            config[property] = value;
            return true;
        } else {
            return false;
        }
    },
};
