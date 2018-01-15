var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        type: 'OAuth2',
        clientId: '',
        clientSecret: ''
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
