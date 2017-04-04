/* This is a sample of the config.environment.js file which is git ignored so not in the repo, for the
bot to work you need to make a config.environment.js file using this sample file and add
your custom values to the properties */

module.exports = {
    /* Your bot's user ID, shown when you obtained the token, or you can right click on the bot on
    discord and copy its ID directly if you have dev mode enabled in your discord settings*/
    botUserID: 'Insert user ID here',
    /* The environment is a string, either "development" (for local running), "staging" (for a test server
    hosted version), or "production" (for a live server hosted version) */
    environment: 'development',
    /* The file path to your project folder ("/app" by default in docker) */
    root: '/app',
    /* Your bot token, obtained from: https://discordapp.com/developers/applications/me */
    token: 'Insert token string here',
};
