'use strict';

// Simply checks project level files such as README.md to make sure they exist

const should = require('chai').should();

const config = require('../config/config.js');
const fs = require('fs');

describe('critical project files', () => {
    it('should have eslint config', () => {
        fs.existsSync(`${config.getConfig().root}/.eslintrc.json`).should.be.true;
    });

    it('should have git attributes', () => {
        fs.existsSync(`${config.getConfig().root}/.gitattributes`).should.be.true;
    });

    it('should have git ignore', () => {
        fs.existsSync(`${config.getConfig().root}/.gitignore`).should.be.true;
    });

    it('should have test docker composistion', () => {
        fs.existsSync(`${config.getConfig().root}/docker-compose-test.yml`).should.be.true;
    });

    it('should have standard (development) docker composition', () => {
        fs.existsSync(`${config.getConfig().root}/docker-compose.yml`).should.be.true;
    });

    it('should have bot Dockerfile', () => {
        fs.existsSync(`${config.getConfig().root}/Dockerfile`).should.be.true;
    });

    it('should have test Dockerfile', () => {
        fs.existsSync(`${config.getConfig().root}/Dockerfile.test`).should.be.true;
    });

    it('should have LICENSE', () => {
        fs.existsSync(`${config.getConfig().root}/LICENSE`).should.be.true;
    });

    it('should have package.json', () => {
        fs.existsSync(`${config.getConfig().root}/package.json`).should.be.true;
    });

    it('should have project readme', () => {
        fs.existsSync(`${config.getConfig().root}/README.md`).should.be.true;
    });
});
