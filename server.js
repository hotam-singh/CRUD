
'use strict';

// requiring modules
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var client = require('redis').createClient('6380', 'localhost');
var RedisStore = require('connect-redis')(session);
var redisOptions = {
    host: 'localhost',
    port: '6380',
    client: client
}
var passport = require('passport');
var flash = require('connect-flash');
const Logger = require('./logger');
let logman = new Logger();
let logger = logman.logger;

// connects to database
mongoose.connect('mongodb://localhost:27017/crud', { useMongoClient: true });
var db = mongoose.connection;

// on database connection error
db.on('error', function(err) {
    logger.error('database connection error : ' + err);
});

// on database connection successful 
db.on('open', function(err) {
    logger.info('database connected successfully');
});

//Create @logs directory if not exists
var utils = require('./utils');
utils.createDir(__dirname + '/logs');

// intantiate an express app
var app = express();
require('dotenv').config();

// initialize passport
require('./passport/passport')(passport);

// use middlewares
app.use(express.static(path.join(__dirname, '/public')));   // serve static files to server
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));     //body-parser moddleware for express framework
app.use(session({ store: new RedisStore(redisOptions), secret : 'It89sm54ys74ec33re84t', resave : false , saveUninitialized: false}));
app.use(passport.initialize());     // attach passport middleware
app.use(passport.session());        // enabling session handling with passport
app.use(flash());                   // catch error, success messages thrown by passport verify callback
app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

// initialize configuration for an app
require('./config')(app);



//express routes handler
require('./routes/api')(app, passport, client);

// starting a server on ${port}
app.listen(app.get('port'), function (req, res) {
    logger.info('server started on port : ' + app.get('port'));
    console.log('server started on port : ' + app.get('port'));
});