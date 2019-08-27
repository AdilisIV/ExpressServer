var Users = require('../models/user_profile');
var uuid = require('uuid/v1');

exports.createUser = function (req, res) {
    // if (req.body.social === "fb") {
    //     Users.exchangeFBAccessToken()

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

exports.auth_facebook = function(req, res) {
    Users.exchangeFBAccessToken(req.body.code, req.body.redirect_uri, function (err, profile) {
        if (err) {
            console.log(err);
            return res.sendStatus(500)
        }
        let user = {
            id: uuid(),
            code: req.body.code,
            secret: req.body.secret,
            social: req.body.social,
            debug: req.body.debug,
            email: profile.email,
            first_name: profile.first_name,
            last_name: profile.last_name,
            picture: 'https://graph.facebook.com/' + profile.id + '/picture?type=large',
            link: profile.link
        };

        Users.create(user, function (err, result) {
            if (err) {
                console.log(err);
                return res.sendStatus(500);
            }
            res.send(user);
        })
    })
};

exports.list = function (req, res) {
    Users.list(function (err, users) {
        if(err) {
            console.log(err);
            return res.sendStatus(500);
        }
        console.log(users)
        res.send(users);
    })
};
