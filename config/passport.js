var FacebookStrategy = require('passport-facebook').Strategy;
var configAuth = require('./fb_auth_cred');
var Users = require('../controllers/user_profile');

module.exports = function (passport) {

    passport.use(new FacebookStrategy({
            clientID: configAuth.facebookAuth.clientID,
            clientSecret: configAuth.facebookAuth.clientSecret,
            callbackURL: configAuth.facebookAuth.callbackURL
        },
        function(accessToken, refreshToken, profile, cb) {
            process.nextTick(function () {
                Users.facebookUser(accessToken, refreshToken, profile, cb)
            })
        }
    ));

};