'use strict';

// requre dependencies
var User = require('../models/user');
var mailServices = require('../mailServices/nodemailer');

function Router(app, passport, client) {

    /** 
    *   favicon.ico handler. Currently no content status is sent from here. We can create 
    *   custom handler for favicon.ico
    */
    app.get('/favicon.ico', function (req, res) {
        //204 No Content Status
        res.sendStatus(204);
    });

    app.get('/verify', function(req, res) {
        //console.log(req.query.id);
        client.get('rand', function(err, value) {
            if(err) {
                return res.send({
                    error: true,
                    message: err
                });
            }
            if(req.query.id == value) {
                client.del('rand', function(err, reply) {
                    if(err) {
                        return res.send({
                            error: true,
                            message: err
                        });
                    }
                    if(reply != 1) {
                        return res.send({
                            error: true,
                            message: 'There is an error while deleting rand key from redis server'
                        });
                    }
                    return res.send({
                        error: false,
                        message: 'Email is verified :)-'
                    });
                });
            }else {
                return res.send({
                    error: true,
                    message: 'Email is already verified'
                })
            }
        });
    });

    app.post('/register', function (req, res) {
        console.log('/register request received on server');
        var username = req.body.username;
        User.find({ email: req.body.email}, function(err, user) {
            if(err) {
                //res.send(err);
                return res.send({
                    error: true,
                    message: err
                });
            }
            if(user.length == 0) {
                var newUser = new User();
                newUser.username = req.body.username;
                newUser.password = req.body.password;  //req.body.password;
                newUser.email = req.body.email;
                newUser.save(function(err) {
                    if(!err) {
                        var rand=Math.floor((Math.random() * 100) + 54);
                        var host=req.get('host');
                        var link="http://"+req.get('host')+"/verify?id="+rand;
                        var mailOptions = {
                            from: process.env.SENDER, // sender address
                            to: process.env.MAILTO, // list of receivers
                            subject: 'Email Verification Link', // Subject line
                            text: '', // plain text body
                            html: "Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>", // https://drive.google.com/open?id=1NXO7RZFijpRBNTGLHWJ_ITlweT7gHRdphtml body
                            auth: {
                                user: process.env.SENDER,
                                refreshToken: process.env.REFRESHTOKEN,
                                accessToken: process.env.ACCESSTOKEN
                            }
                        };
                        mailServices.sendMail(mailOptions, function(err) {
                            if(err) {
                                return res.send({
                                    error: true,
                                    message: err
                                });
                            }
                            client.set('rand', rand, function(err) {
                                if(err) {
                                    return res.send({
                                        error: true,
                                        message: err
                                    });
                                }
                                client.expire('rand', 600);
                                return res.send({
                                    error: false,
                                    message: 'Please check your email to activate your account'
                                });
                            });
                        });
                    }else {
                        return res.send({
                            error: true,
                            message: err.message
                        });
                    }
                });
            }else {
                //return res.send('user is already registerred');
                return res.send({
                    error: true,
                    message: 'user is already registerred'
                });
            }
        });
    });

    app.post('/validate', function(req, res) {
        console.log(req.body);
        var newUser = new User();
        User.findOne({ username: req.body.username }).exec(function(err, user) {
            if(err) {
                return res.send({
                    error: true,
                    message: err
                })
            }
            if(!user) {
                return res.send({
                    error: true,
                    message: 'user not found'
                })
            }
            newUser = user;
            var validatePassword = newUser.validatePassword(req.body.password);
            if(!validatePassword) {
                return res.send({
                    error: true,
                    message: 'password do not match'
                })
            }
            return res.send({
                return : false,
                message: 'user is authenticated successsfully'
            })
        });
    });

    // general request handler
    app.get('*', function (req, res) {
        res.sendFile('/home/hotam/hotam/apps/MEAN/CRUD/public/app/views/index.html'); // load our public/index.html file
    });
};

module.exports = Router;
