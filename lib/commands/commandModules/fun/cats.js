'use strict';

// Module to handle the %cats command, pulls image or gif from thecatapi.com then replies to user

const discord = require('discord.js');
const log = require('../../../logger.js')(module);
const request = require('request');

const API = 'http://thecatapi.com/api/images/get?format=src&type=';
const preliminaryEmbed = new discord.RichEmbed()
        .setAuthor('Ava', 'http://i.imgur.com/ZJEGUIk.jpg')
        .setColor('#0086AE')
        .addField('Generating Cats!',
            'Awaiting API response, please wait....'
            , true)
        .setFooter('Powered by: thecatapi.com', 'http://i.imgur.com/rEvMja3.png');

module.exports = {
    execute(message) {
        log.verbose(`Called by ${message.member.displayName} (${message.author.id}), on ${message.guild.name}` +
            ` (${message.guild.id})`);

        message.channel.sendEmbed(preliminaryEmbed)
            .then((prelimResponse) => {
                requestCat(prelimResponse, message);
            })
            .catch((err) => {
                log.warn(`Failed to send initial embed, ${err}`);
            });
    },
};

function requestCat(prelimResponse, message) {
    let type;
    if (message.cleanContent.indexOf('gif') !== -1) {
        type = 'gif';
    } else {
        type = 'jpg';
    }

    const r = request
        .get(API + type, () => {
            log.silly(`API response: ${r.uri.href}`);
            const cat = r.uri.href;
            if (cat.endsWith(`.${type}`)) {
                editResponse(prelimResponse, cat, true);
            } else {
                log.warn('API response was not of desired type, deploying emergency cats');
                editResponse(prelimResponse, '', false);
            }
        })
        .on('response', (response) => {
            log.silly(`Response status code: ${response.statusCode}`);
            if (response.statusCode !== 200) { editResponse(prelimResponse, '', false); }
        });
}

function editResponse(prelimResponse, cat, success) {
    const newEmbed = new discord.RichEmbed()
            .setAuthor('Ava', 'http://i.imgur.com/ZJEGUIk.jpg')
            .setColor('#0275ea');

    if (success) {
        newEmbed
            .setFooter('Powered by: thecatapi.com', 'http://i.imgur.com/rEvMja3.png')
            .setImage(cat);
    } else {
        newEmbed
            .setFooter('Powered by: thecatapi.com... Usually...', 'http://i.imgur.com/rEvMja3.png')
            .setImage('http://i.imgur.com/RC4JnXc.jpg');
    }

    prelimResponse.edit('', { embed: newEmbed })
        .then(log.silly('succesffully edited message'))
        .catch((err) => {
            log.warn(`Failed to edit message, ${err}`);
        });
}
