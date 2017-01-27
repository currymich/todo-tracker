var express = require('express');
var router = express.Router();
var User = require('../models/user.js');
var Todo = require('../models/todo.js');
var authHelper = require('../helpers/auth.js');

//LOGIN USER - take data from login form and send to authHelper
router.post('/login', authHelper.loginUser, function(req, res){
  console.log(req.session.currentUser)
  res.redirect('/users/' + req.session.currentUser._id);
});

//LOGOUT USER
router.delete('/', function(req, res){
  req.session.destroy(function(){
    res.redirect('/users/login');
  });
});

module.exports = router;
