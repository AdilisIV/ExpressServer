var Users = require('../models/user_profile');
var uuid = require('uuid/v1');

exports.createUser = function (req, res) {
    var user = {
        id: uuid(),
        token: req.body.token,
        secret: req.body.secret,
        social: req.body.social,
	    debug: req.body.debug,
	    email: req.body.email
    };

    Users.create(user, function (err, result) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(user);
    })
};

exports.list = function (req, res) {
    Users.list(function (err, users) {
        if(err) {
            console.log(err);
            return res.sendStatus(500);
        }
        console.log(users);
        res.send(users);
    })
};

exports.facebookUser = function (accessToken, refreshToken, profile, callback) {
    Users.userByAuthID("fb", profile.id, function (err, user) {
        if(err) {
            throw err;
            // return callback(err, null);
        } else if(user) {
            console.log("User already exists in database");
            return callback(null, user);
        } else {
            let user = {
                id: profile.id,
                token: accessToken,
                social: "fb",
                email: profile.emails[0].value,
                first_name: profile.name.givenName,
                last_name: profile.name.familyName,
                gender: profile.gender,
                // user.picture = 'https://graph.facebook.com/' + profile.id + '/picture?type=large';
            };
            console.log(user);
            Users.create(user, function (err, newUser) {
                if (err) {
                    console.log(err);
                    return callback(err, null)
                }
                return callback(null, newUser);
            });
        }
    })
};
