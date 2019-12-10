var passport = require('passport');
var jwt = require('jwt-simple');
// var User = require('./models/user_profile');


// ======================== Facebook Auth ==================================
exports.authFacebook = passport.authenticate('facebook', {
    scope: 'email'
});

exports.facebookCallback = function(req, res) {
    // passport.authenticate('facebook', { failureRedirect: '/' }, function (req, res) {
    //     // Successful authentication, redirect home.
    //     res.redirect('/profile');
    // })

    // passport.authenticate('local', function(err, user) {
    //     if (!user) { return res.redirect('/'); }
    //     // res.end('Authenticated!');
    //     res.redirect('/profile');
    // })(req, res);

    passport.authenticate('facebook', function(err, user, info) {
        if (!user) { return res.redirect('/'); }
        res.redirect('/profile');
    })(req, res);
};