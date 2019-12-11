const jwt = require('jsonwebtoken');
const config = require('../config/server.config');


exports.signToken = function(id) {
    return jwt.sign({ _id: id }, config.secret, { expiresIn: '5d' });
};