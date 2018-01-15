'use strict';

var express = require('express');


function Config(app) {
    //set app's port
    app.set('port', process.env.PORT || 8081);
};

module.exports = Config;