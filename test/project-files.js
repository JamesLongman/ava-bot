// Simply checks project level files such as README.md to make sure they exist

const should = require('chai').should();

const config = require('../config/config.js');
const fs = require('fs');

describe('critical project files', function () {
    it('should have git attributes', function () {
        var success = false;
        try {
            fs.existsSync(config.getConfig().root + '/.gitattributes');
            success = true;
        } catch (err) {
            console.log(err);
        }

        success.should.be.true;
    });

    it('should have git ignore', function () {
        var success = false;
        try {
            fs.existsSync(config.getConfig().root + '/.gitignore');
            success = true;
        } catch (err) {
            console.log(err);
        }

        success.should.be.true;
    });

    it('should have jscsrc', function () {
        var success = false;
        try {
            fs.existsSync(config.getConfig().root + '/.jscsrc');
            success = true;
        } catch (err) {
            console.log(err);
        }

        success.should.be.true;
    });

    it('should have test docker composition', function () {
        var success = false;
        try {
            fs.existsSync(config.getConfig().root + '/docker-compose-test.yml');
            success = true;
        } catch (err) {
            console.log(err);
        }

        success.should.be.true;
    });

    it('should have standard (development) docker composition', function () {
        var success = false;
        try {
            fs.existsSync(config.getConfig().root + '/docker-compose.yml');
            success = true;
        } catch (err) {
            console.log(err);
        }

        success.should.be.true;
    });

    it('should have Dockerfile', function () {
        var success = false;
        try {
            fs.existsSync(config.getConfig().root + '/Dockerfile.yml');
            success = true;
        } catch (err) {
            console.log(err);
        }

        success.should.be.true;
    });

    it('should have LICENSE', function () {
        var success = false;
        try {
            fs.existsSync(config.getConfig().root + '/LICENSE');
            success = true;
        } catch (err) {
            console.log(err);
        }

        success.should.be.true;
    });

    it('should have package.json', function () {
        var success = false;
        try {
            fs.existsSync(config.getConfig().root + '/package.json');
            success = true;
        } catch (err) {
            console.log(err);
        }

        success.should.be.true;
    });

    it('should have project readme', function () {
        var success = false;
        try {
            fs.existsSync(config.getConfig().root + '/README.md');
            success = true;
        } catch (err) {
            console.log(err);
        }

        success.should.be.true;
    });
});
