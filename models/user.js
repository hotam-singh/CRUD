'use strict';

// require dependencies
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs')

// Use bluebird as custom promise library for mongoose. Native library for mongoose is deprecated
mongoose.Promise = require('bluebird');

// creating mongoose schema's instance
var Schema = mongoose.Schema;

// defining user schema that will directoly mapped with mongodb's user collection
var userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true }
});

// calling mongoose pre middleware and hashes password before saving into the database
userSchema.pre('save', function(next) {
    var user = this;
    bcrypt.hash(user.password, bcrypt.genSaltSync(10), null, function(err, hash) {
        if(err) next(err);
        user.password = hash;
        next();
    });
}); 

userSchema.methods.validatePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

// the schema is useless so far
// we need to create a model for using this schema
var User = mongoose.model('user', userSchema);

// make this available to our users in our Node applications
module.exports = User;