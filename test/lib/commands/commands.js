'use strict';

// Tests commands.js

/* eslint no-unused-vars: 0, no-unused-expressions: 0 */

const should = require('chai').should();

const commands = require('../../../lib/commands/commands.js');

describe('lib/commands/commands.js', () => {
    const message = {
        author: {
            bot: false,
            id: '301159838132469760',
            username: 'James L',
        },
        channel: {
            sendMessage: function sendMessage() {
                return new Promise((resolve) => {
                    resolve(true);
                });
            },
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

    describe('function commandCall', () => {
        it('should function commandCall', () => {
            commands.should.have.property('commandCall');
            commands.commandCall.should.be.an('function');
        });

        it('commandCall should return true if there is a valid command to be called', () => {
            commands.commandCall('ping', message).should.be.true;
        });

        it('commandCall should return false if there is no valid command', () => {
            commands.commandCall('notARealCommand', message).should.be.false;
        });
    });

    it('should have array of all commands', () => {
        commands.should.have.property('commandsList');
        commands.commandsList.should.be.an('array');
        commands.commandsList.indexOf('ping').should.not.eql(-1);
    });

    describe('function filter', () => {
        it('should function filter', () => {
            commands.should.have.property('filter');
            commands.filter.should.be.an('function');
        });

        it('filter should return true if the message contains a valid command', () => {
            // Test all commands contained in command list
            for (const x in commands.commandsList) {
                message.content = `%${commands.commandsList[x]}`;
                commands.filter(message).should.eql(commands.commandsList[x]);
            }

            // Explicitly test one command too
            message.content = '%ping (anything here really should not matter)';
            commands.filter(message).should.eql('ping');
        });

        it('filter should return false if there is no valid command', () => {
            message.content = '%notARealCommand';
        });
    });

    it('should function prefix', () => {
        commands.should.have.property('prefix');
        commands.prefix.should.be.an('function');
    });
});
