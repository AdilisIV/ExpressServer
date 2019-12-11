var express = require('express');
var controller = require('../controllers/user_profile');
var auth = require('../controllers/auth.service');
var router = express.Router();

router.use(auth.checkToken);
router.use(auth.findMatchUser);

/* POST users listing. */
// router.post('/auth', controller.createUser);

/* GET users listing. */
router.get('/', controller.list);


module.exports = router;