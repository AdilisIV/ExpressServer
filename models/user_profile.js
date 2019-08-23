var ObjectID = require('mongodb').ObjectID;
var db = require('../db');

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