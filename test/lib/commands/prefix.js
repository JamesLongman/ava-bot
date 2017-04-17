'use strict';

// Tests prefix.js

/* eslint no-unused-vars: 0, no-unused-expressions: 0 */

const should = require('chai').should();

const prefix = require('../../../lib/commands/prefix.js');

describe('lib/commands/prefix.js', () => {
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

    it('should have function execute', () => {
        prefix.should.have.property('execute');
        prefix.execute.should.be.an('function');
    });

    it('execute should return true if message starts with command prefix', () => {
        message.content = '%ping';
        prefix.execute(message).should.be.true;
    });

    it('execute should return false if message does not start with command prefix', () => {
        message.content = '!ping';
        prefix.execute(message).should.be.false;

        message.content = '#ping';
        prefix.execute(message).should.be.false;

        message.content = 'ping';
        prefix.execute(message).should.be.false;
    });
});
