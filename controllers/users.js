var express = require('express');
var router = express.Router();
var User = require('../models/user.js');
var Ticket = require('../models/ticket.js');
var authHelper = require('../helpers/auth.js')

//SIGNUP ROUTE - show a signup page
router.get('/signup', function(req, res){
  res.render('users/signup.hbs');
})

//LOGIN ROUTE - show login page
router.get('/login', function(req,res){
  res.render('users/login.hbs');
})

//EDIT ROUTE - edit user details (only access your own or access any as admin)
router.get('/:userId/edit', authHelper.authorize, function(req, res){
  User.findById(req.params.userId)
    .exec(function(err, user){
      if(err) console.log(err);
      // console.log('Edit route for ' + user.username);
      res.render('users/edit.hbs', {user: user});
    })
})

//SHOW ROUTE - view user details
router.get('/:userId', function(req, res){
  User.findById(req.params.userId)
    .exec(function(err, user){
      if(err) console.log(err);
      console.log(user);
      res.render('users/show.hbs', {user: user, currentUser: req.session.currentUser});
    })
})

//CREATE ROUTE - receives data from signup form, creates new user
router.post('/', authHelper.createSecure, function(req, res){
  console.log(res.hashedPassword)
  var user = new User({
    email: req.body.email,
    username: req.body.username,
    password_digest: res.hashedPassword,
    tickets_assigned: [],
    tickets_created: []
  })
  console.log('user before save' + user)
  user.save(function(err, user){
    if(err) console.log(err);
    console.log('user after save' + user)
    req.session.currentUser = user;
    res.redirect('/users/' + user._id);
  })
})


//UPDATE ROUTE - receives data from edit form

router.put('/:userId', function(req, res){
  User.findByIdAndUpdate(req.params.userId, {
    username: req.body.username,
    // password: ,
    email: req.body.email
  }, {new: true})
  .exec(function(err, user){
    if(err) console.log(err);
    console.log(user);
    res.redirect('/users/' + user._id)
  })
})

module.exports = router;
