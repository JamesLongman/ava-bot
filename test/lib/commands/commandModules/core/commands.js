'use strict';

// Tests ping.js

/* eslint no-unused-vars: 0, no-unused-expressions: 0 */

const should = require('chai').should();

const commands = require('../../../../../lib/commands/commandModules/core/commands.js');

describe('lib/commands/commandModules/core/commands.js', () => {
    it('should have function execute', () => {
        commands.should.have.property('execute');
        commands.execute.should.be.a('function');
    });

    describe('test execute', () => {
        const message = {
            author: {
                bot: false,
                id: '301159838132469760',
                username: 'James L',
            },
            cleanContent: 'Hi',
            content: 'Hi',
            guild: {
                id: '301160200163950604',
                name: 'Ava',
            },
            member: {
                displayName: 'James L',
                hasPermission(perm) {
                    return false;
                },
            },
        };
        let channelMessage = false;
        let authorMessage = false;
        message.channel = {};
        message.channel.sendMessage = function sendMessage(relay) {
            channelMessage = relay;
            return new Promise((resolve) => {
                resolve(true);
            });
        };
        message.author.sendMessage = function sendMessage(relay) {
            authorMessage = relay;
            return new Promise((resolve) => {
                resolve(true);
            });
        };

        before((done) => {
            function summary(prefix) {
                return {
                    core: ['one', 'two'],
                    bot: ['one', 'two'],
                };
            }
            commands.execute(message, summary);
            const complete = setTimeout(done, 1); // Give promise time to execute
        });

        it('should have replied with command list', () => {
            channelMessage.should.eql('I\'ll PM you with a list of commands James L');
            authorMessage.indexOf('__**Command List**__').should.eql(0);
        });
    });
});
