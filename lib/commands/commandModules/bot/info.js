'use strict';

// Module to handle the %info command, gives information on Ava

const discord = require('discord.js');
const log = require('../../../logger.js')(module);
const packageMod = require('../../../../package.json');

module.exports = {
    execute: function execute(message) {
        log.verbose(`Called by ${message.member.displayName} (${message.author.id}), on ${message.guild.name}` +
            ` (${message.guild.id})`);

        const embed = new discord.RichEmbed()
            .setAuthor('Ava', 'http://i.imgur.com/ZJEGUIk.jpg')
            .setTitle('__Ava Bot Information__')
            .setColor('#0086AE')
            .setThumbnail('http://i.imgur.com/RDvjDQ0.jpg')
            .addField('Purpose', 'Ava is a general purpose discord bot. Ava is developed open-source ' +
            'with the purpose of providing an easy to expand upon blueprint from which people can ' +
            'create their own custom bots. The Ava bot itself however is completely open to public use.', true)
            .addField('Framework', 'Language: *Javascript (node.js)*' +
            '\nDiscord API Library: *discord.js*', true)
            .addField('Version', packageMod.version, true);

        message.channel.sendEmbed(embed)
            .then(log.silly('Succesfully sent embed'))
            .catch((err) => {
                log.warn(`Failed to send embed, ${err}`);
            });
    },
};
