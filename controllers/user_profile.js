var Users = require('../models/user_profile');
var uuid = require('uuid/v1');

exports.createUser = function (req, res) {
    var user = {
        id: uuid(),
        token: req.body.token,
        secret: req.body.secret,
        social: req.body.social
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
        res.send(users);
    })
};