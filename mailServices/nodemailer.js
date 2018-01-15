var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        type: 'OAuth2',
        clientId: '954642061655-6bfeecg6dfcjtilvdfgef32sig0kjq0q.apps.googleusercontent.com',
        clientSecret: 'rPpqKKEt9fqAlOsMMkn5pTqv'
    }
});

nodemailer.sendMail = function(mailOptions, callback) {
    transporter.sendMail(mailOptions, function(err, info) {
        if(err) {
            return callback(err);
        }
        //console.log('mail sent successfully');
        return callback(null);
    });
};

module.exports = nodemailer;