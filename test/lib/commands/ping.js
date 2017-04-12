'use strict';

// Tests ping.js

/* eslint no-unused-vars: 0, no-unused-expressions: 0*/

const should = require('chai').should();

const ping = require('../../../lib/commands/ping.js');
const fakeObjects = require('../../testTools/fakeDiscordObjects.js');

describe('lib/commands/ping.js', () => {
    it('should have function execute', () => {
        ping.should.have.property('execute');
        ping.execute.should.be.a('function');
    });

    describe('test execute', () => {
        const message = fakeObjects.message;
        let channelMessage = false;
        const edits = [];
        message.channel = {};
        message.channel.sendMessage = function sendMessage(relay) {
            channelMessage = relay;
            return new Promise((resolve) => {
                resolve(secondMessage);
            });
        };
        message.createdTimestamp = 0;
        const secondMessage = {
            createdTimestamp: 0,
            edit(relay) {
                edits.push(relay);
                return new Promise((resolve) => {
                    resolve(true);
                });
            },
        };

        before((done) => {
            secondMessage.createdTimestamp = 10;
            ping.execute(message);
            const second = setTimeout(() => {
                secondMessage.createdTimestamp = 75;
                ping.execute(message);
            }, 1);
            const third = setTimeout(() => {
                secondMessage.createdTimestamp = 200;
                ping.execute(message);
            }, 2);
            const fourth = setTimeout(() => {
                secondMessage.createdTimestamp = 450;
                ping.execute(message);
            }, 3);
            const fifth = setTimeout(() => {
                secondMessage.createdTimestamp = 1050;
                ping.execute(message);
            }, 4);
            const complete = setTimeout(done, 5); // Give promises time to execute
        });

        it('test results should be in', () => {
            channelMessage.should.eql('pong');
            edits.length.should.eql(5);
        });

        it('should show excellent ping', () => {
            edits[0].should.eql('Ping: 10ms (Excellent)');
        });

        it('should show very good ping', () => {
            edits[1].should.eql('Ping: 75ms (Very Good)');
        });

        it('should show good ping', () => {
            edits[2].should.eql('Ping: 200ms (Good)');
        });

        it('should show mediocre ping', () => {
            edits[3].should.eql('Ping: 450ms (Mediocre)');
        });

        it('should show bad ping', () => {
            edits[4].should.eql('Ping: 1050ms (Bad)');
        });
    });
});
