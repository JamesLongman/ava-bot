'use strict';

// Tests commands.js

/* eslint no-unused-vars: 0, no-unused-expressions: 0*/

const should = require('chai').should();

const commands = require('../../../lib/commands/commands.js');
const fakeObjects = require('../../testTools/fakeDiscordObjects.js');

describe('lib/commands/commands.js', () => {
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

        it('filter should return the command being used if there is one', () => {
            // Test all commands contained in command list
            for (const x in commands.commandsList) {
                const message = fakeObjects.message;
                message.content = `%${commands.commandsList[x]}`;
                commands.filter(message).should.eql(commands.commandsList[x]);
            }

            // Explicitly test one command too
            const message = fakeObjects.message;
            message.content = '%ping (anything here really should not matter)';
            commands.filter(message).should.eql('ping');
        });

        it('filter should return false if there is no valid command', () => {
            const message = fakeObjects.message;
            message.content = '%notARealCommand';
        });
    });

    it('should function ping', () => {
        commands.should.have.property('ping');
        commands.ping.should.be.an('function');
    });

    it('should function prefix', () => {
        commands.should.have.property('prefix');
        commands.prefix.should.be.an('function');
    });
});
