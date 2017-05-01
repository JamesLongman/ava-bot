# This bot is currently in development and not very functional

<div align="center">
  <p>
     <a href="https://travis-ci.org/JamesLongman/ava-discordbot"><img src="https://travis-ci.org/JamesLongman/ava-discordbot.svg?branch=master"/></a>
     <a href='https://coveralls.io/github/JamesLongman/ava-discordbot'><img src='https://coveralls.io/repos/github/JamesLongman/ava-discordbot/badge.svg' alt='Coverage Status' /></a>
    <a href="https://www.codacy.com/app/James-LongmanOrganization/ava-discordbot?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=JamesLongman/ava-discordbot&amp;utm_campaign=Badge_Grade"><img src="https://api.codacy.com/project/badge/Grade/917e7c704f2546abb72862a8c51982a7"/></a>
    <a href="https://david-dm.org/JamesLongman/ava-discordbot" title="dependencies status"><img src="https://david-dm.org/JamesLongman/ava-discordbot/status.svg"/></a>
    <a href="https://github.com/JamesLongman/ava-discordbot/blob/master/LICENSE"><img src="https://img.shields.io/github/license/JamesLongman/ava-discordbot.svg"></a>
  </p>
</div>

## About
Ava is an open-source multi-server general discord bot, the bot is built using node.js with the [discord.js](https://github.com/hydrabolt/discord.js) API library.

The main purpose of Ava is to provide example code from which you may build your own bot. Ava's code is designed with modular programming in mind so isolating the code for one particular feature should hopefully not be too difficult.

Ava is designed to run with:
- Multi-server support
- Integration with a MySQL database
- Production, staging and development environments powered by [Docker](https://www.docker.com/what-docker)
- CI tests run by [Travis](https://travis-ci.org/JamesLongman/ava-discordbot)

Ava's features (Customisable, features can be disabled and enabled for your server):
- Multiple commands (list below)
- Automatic moderation
- Admin commands
- Server member statistic tracking

The Ava project complies with community [best practices](https://github.com/meew0/discord-bot-best-practices) for discord bots

## Code usage
The Ava bot is developed open-source under the MIT license, feel free to use the entire code or sections however you like with attribution.

## Installation for devs
If you are able to run Docker then running Ava is as simple as cloning the repository, customising your local git ignored configs, then running `docker-compose up --build` in the project directory

However if you are not able to run Docker you can also run the bot manually by running the lib/ava.js script in node. Please however note this will require:
- Node.js 6.0.0 or higher
- package.json dependencies
- Python and node-gyp build tools (if you're on windows you can use "npm install -g windows-build-tools" when running your CLI as admin)
