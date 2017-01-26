var express = require('express');
var router = express.Router();
var User = require('../models/user.js');
var Todo = require('../models/todo.js');

//SIGNUP ROUTE - show a signup page
router.get('/signup', function(req, res){
  res.render('users/signup.hbs');
})

//EDIT ROUTE - edit user details (only access your own or access any as admin)
router.get('/:userId/edit', function(req, res){
  res.render('users/edit.hbs');
})

//SHOW ROUTE - view user details
router.get('/:userId', function(req, res){
  res.render('users/show.hbs');
})

//CREATE ROUTE - receives data from signup form, creates new user
router.post('/', function(req, res){
  res.send('created something!')
})


module.exports = router;
