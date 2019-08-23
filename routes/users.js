var express = require('express');
var controller = require('../controllers/user_profile')
var router = express.Router();

/* POST users listing. */
router.post('/auth', controller.createUser);

/* GET users listing. */
router.get('/', controller.list);

module.exports = router;
