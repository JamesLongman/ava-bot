'use strict';

// Tests prefix.js

/* eslint no-unused-vars: 0, no-unused-expressions: 0*/

const should = require('chai').should();

const prefix = require('../../../lib/commands/prefix.js');
const fakeObjects = require('../../testTools/fakeDiscordObjects.js');

describe('lib/commands/prefix.js', () => {
    it('should have function execute', () => {
        prefix.should.have.property('execute');
        prefix.execute.should.be.an('function');
    });

    it('execute should return true if message starts with command prefix', () => {
        const message = fakeObjects.message;
        message.content = '%ping';
        prefix.execute(message).should.be.true;
    });

    it('execute should return false if message does not start with command prefix', () => {
        const message = fakeObjects.message;
        message.content = '!ping';
        prefix.execute(message).should.be.false;

        message.content = '#ping';
        prefix.execute(message).should.be.false;

        message.content = 'ping';
        prefix.execute(message).should.be.false;
    });
});
