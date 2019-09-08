
var ObjectID = require('mongodb').ObjectID;
var db = require('../db');
var app = require('../app')
var config = require('../config/config')
var request = require('request');
var jwt = require('jwt-simple');

exports.create = function (user, callback) {
    db.get().collection('users').insert(
        user,
        function (err, result) {
            callback(err, result);
        })
};

exports.list = function (callback) {
    db.get().collection('users').find().toArray(function (err, users) {
        callback(err, users)
    })
};

/*
 |--------------------------------------------------------------------------
 | Login with Facebook
 |--------------------------------------------------------------------------
 */

exports.exchangeFBAccessToken = function(code, redirect_uri, callback) {
    // app.post('/auth/facebook', function(req, res) {
        var fields = ['id', 'email', 'first_name', 'last_name', 'link', 'name'];
        var accessTokenUrl = 'https://graph.facebook.com/v2.12/oauth/access_token';
        var graphApiUrl = 'https://graph.facebook.com/v2.12/me?fields=' + fields.join(',');
        var params = {
            code: code,
            client_id: config.FACEBOOK_CLIENTID,
            client_secret: config.FACEBOOK_SECRET,
            redirect_uri: redirect_uri
        };

        // Step 1. Exchange authorization code for access token.
        console.log("Make request with url: " + accessTokenUrl + " \n and params: " + params);
        request.get({ url: accessTokenUrl, qs: params, json: true }, function(err, response, accessToken) {
            console.log(accessToken);
            if (response.statusCode !== 200) {
                response.status(500).send({ message: accessToken.error.message });
            }

            // Step 2. Retrieve profile information about the current user.
            request.get({ url: graphApiUrl, qs: accessToken, json: true }, function(err, response, profile) {
                if (response.statusCode !== 200) {
                    return response.status(500).send({ message: profile.error.message });
                }
                // if (req.header('Authorization')) { auth } else { create new }
                // Step 3. Create a new user account or return an existing one.
                db.get().collection('users').findOne({ facebook: profile.id }, function (err, existingUser) {
                    if (existingUser) {
                        return response.send({ token: existingUser.token })
                    }
                    callback(err, profile)
                })

                // User.findOne({ facebook: profile.id }, function(err, existingUser) {
                //     if (existingUser) {
                //         var token = createJWT(existingUser);
                //         return res.send({ token: token });
                //     }
                //     var user = new User();
                //     user.facebook = profile.id;
                //     user.picture = 'https://graph.facebook.com/' + profile.id + '/picture?type=large';
                //     user.displayName = profile.name;
                //     user.save(function() {
                //         var token = createJWT(user);
                //         res.send({ token: token });
                //     });
                // });
            });
        });
    // });
};