const passport = require('passport');
const jwt = require('jsonwebtoken');
const Users = require('../models/user_profile');
const config = require('../config/server.config');
const jwt_helper = require('../common/jwt.helper');


// MARK: - Facebook Auth

exports.authFacebook = passport.authenticate('facebook', {
    scope: 'email'
});

exports.facebookCallback = function(req, res) {
    passport.authenticate('facebook', function(err, user, info) {
        if (err) { return res.status(401).json(err); }
        if (!user) { return res.status(404).json({ message: "Cannot process the request." }); }
        console.log("'Authenticated!'");
        let token = jwt_helper.signToken(user._id);
        res.setHeader('Authorization', 'Bearer '+ token);
        return res.status(200).json({ message: 'Auth token has been specified' });
        // res.headers["Authorization"] = token;
        // res.redirect('/profile');
    })(req, res);
};


// MARK: - Auth Middleware

exports.checkToken = function (req, res, next) {
    var token = req.body.token || req.query.token || req.headers['Authorization'];
    if (!token) {
        return res.status(401).json({ message: 'Auth token did not provide' });
    }
    jwt.verify(token, config.secret, function (err, decoded) {
        if (err) {
            return res.status(401).json({ message: 'Auth token did not verify' });
        }
        req.decoded = decoded;
        next();
    });
};

exports.findMatchUser = function (req, res, next) {
    Users.userByAuthID(req.decoded.social, req.decoded.id, function (err, user) {
        if (err) {
            return res.status(500).json({ message: 'User does not exist' });
        }
        if (!user) {
            return res.status(401).json({ message: 'User does not exist' });
        }
        req.user = user;
        next();
    });
};







