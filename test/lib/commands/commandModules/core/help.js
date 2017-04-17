'use strict';

// Tests help.js

/* eslint no-unused-vars: 0, no-unused-expressions: 0 */

const should = require('chai').should();

const help = require('../../../../../lib/commands/commandModules/core/help.js');

describe('lib/commands/commandModules/core/help.js', () => {
    it('should have function execute', () => {
        help.should.have.property('execute');
        help.execute.should.be.a('function');
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
            },
        };
        const channelMessages = [];
        message.channel = {};
        message.channel.sendMessage = function sendMessage(relay) {
            channelMessages.push(relay);
            return new Promise((resolve) => {
                resolve(true);
            });
        };

        before((done) => {
            const details = {
                fail: 'nope',
                success: 'test passed',
                failCase: 'fail case',
            };
            const first = setTimeout(() => {
                message.cleanContent = '%help';
                help.execute(message, details);
            }, 1);
            const second = setTimeout(() => {
                message.cleanContent = '%help success';
                help.execute(message, details);
            }, 2);
            const third = setTimeout(() => {
                message.cleanContent = '%help notAFunction';
                help.execute(message, details);
            }, 3);
            const complete = setTimeout(done, 4); // Give promise time to execute
        });

        it('test results should be in', () => {
            channelMessages.length.should.eql(3);
        });

        it('should have generic "%help" response', () => {
            channelMessages[0].indexOf('Hi I\'m AVA, a general purpose discord bot. I h').should.eql(0);
        });

        it('should reply to requests for help with specific commands/features', () => {
            channelMessages[1].should.eql('`%success` test passed');
        });

        it('should respond with more in depth explination of help if command/feature isn\'t recognised', () => {
            channelMessages[2].indexOf('Sorry I couldn\'t recognise that command/feat').should.eql(0);
        });
    });
});
