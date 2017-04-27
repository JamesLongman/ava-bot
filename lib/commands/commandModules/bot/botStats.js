'use strict';

// Module to handle the %botStats command, provides bot statistics

const data = require('../../../botData/data.js');
const discord = require('discord.js');
const log = require('../../../logger.js')(module);
const moment = require('moment');
const packageFile = require('../../../../package.json');
const pusage = require('pidusage');

module.exports = {
    execute(message) {
        log.verbose(`Called by ${message.member.displayName} (${message.author.id}), on ` +
            `${message.guild.name} (${message.guild.id})`);

        const start = Date.now();

        const guilds = data.getClient().guilds;
        let users = 0;
        for (const guild of guilds) {
            users += guild[1].memberCount;
        }

        Promise.all([system()])
            .then((result) => {
                const embed = new discord.RichEmbed()
                    .setAuthor('Bot Statistics', 'http://i.imgur.com/ZJEGUIk.jpg')
                    .setColor('#0275ea')

                    .addField('\u200b', '\u200b', true)
                    .addField('\u200b', '__General Bot Stats__', true)
                    .addField('\u200b', '\u200b', true)
                    .addField('Servers', `${guilds.size} guilds`, true)
                    .addField('Users', users, true)
                    .addField('\u200b', '\u200b', true)

                    .addField('\u200b', '\u200b', true)
                    .addField('\u200b', '__Process Details__', true)
                    .addField('\u200b', '\u200b', true)
                    .addField('CPU Usage', `${result[0].cpu.toFixed(2)}%`, true)
                    .addField('Memory Usage', `${Math.round(result[0].memory / 1000000)}MB`, true)
                    .addField('Uptime', moment.duration(Date.now() - data.getStarted()).humanize(), true)

                    .addField('\u200b', '\u200b', true)
                    .addField('\u200b', '__Technical Specs__', true)
                    .addField('\u200b', '\u200b', true)
                    .addField('Ava Version', `${packageFile.version}`, true)
                    .addField('Node Version', `${process.version}`, true)
                    .addField('discord.js Version', `${packageFile.dependencies['discord.js']}`, true)

                    .setFooter(`Generated in ${Date.now() - start}ms`);

                message.channel.sendEmbed(embed)
                    .catch((err) => { log.warn(`Failed to send embed, ${err}`); });
            })
            .catch((err) => {
                log.warn(`Reject in Promise.all, ${err}`);
            });
    },
};


function system() {
    return new Promise((resolve, reject) => {
        pusage.stat(process.pid, (err, stat) => {
            if (err) {
                log.warn(`PUsage lookup failed, ${err}`);
                reject('PUsage lookup failed');
            }
            pusage.unmonitor(process.pid);
            resolve(stat);
        });
    });
}
