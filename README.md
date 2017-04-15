# This bot is currently in development and not very functional

## About
Ava is an open-source multi-server general discord bot, the bot is built using node.js with the ([discord.js](https://github.com/hydrabolt/discord.js)) API library.

The main purpose of Ava is to provide example code from which you may build your own bot. Ava's code is designed with modular programming in mind so isolating the code for one particular feature should hopefully not be too difficult.

Ava is designed to run with:
- Multi-server support
- Database integration
- Production, staging and development environments powered by [Docker](https://www.docker.com/what-docker)
- Continuous integration testing

Ava's features (Customisable, features can be disabled and enabled for your server):
- Multiple commands (list below)
- Automatic moderation
- Admin commands
- Server member statistic tracking

## Code usage
The Ava bot is developed open-source under the MIT license, feel free to use the entire code or sections however you like with attribution.

## Installation for devs
If you are able to run Docker then running Ava is as simple as cloning the repository, customising your local git ignored configs, then running `docker-compose up --build` in the project directory

However if you are not able to run Docker you can also run the bot manually by running the lib/ava.js script in node. Please however note this will require:
- Node.js 6.0.0 or higher
- package.json dependencies
