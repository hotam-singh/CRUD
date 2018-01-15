var env = process.env;

module.exports = {
    nodemailer: {
        clientId: env.CLIENT_ID,
        clientSecret: env.CLIENT_SECRET
    }
}