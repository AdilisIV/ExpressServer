var express = require('express');
var router = express.Router();
var auth = require('../controllers/auth.service');


// MARK: - GET home page
router.get('/', function(req, res, next) {
  res.render('index.ejs');
});

router.get('/profile', function(req, res){
  res.render('profile.ejs', { user: req.user });
});


// function isLoggedIn(req, res, next) {
//   if(req.isAuthenticated()){
//     return next();
//   }
//   res.redirect('/login');
// }

module.exports = router;
