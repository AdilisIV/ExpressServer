var express = require('express');
var auth = require('../controllers/auth.service');

var router = express.Router();


router.get('/facebook', auth.authFacebook);
router.get('/facebook/callback', auth.facebookCallback);

module.exports = router;