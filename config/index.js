'use strict';

var express = require('express');
var env = require('./env');
var utils = require('../utils');


function Config(app) {
    //set app's port
    app.set('port', process.env.PORT || 8081);

    //utils.merge(config, env);
};

module.exports = Config;