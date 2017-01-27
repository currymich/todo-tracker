var express = require('express');
var router = express.Router();
var User = require('../models/user.js');
var Todo = require('../models/todo.js');
var authHelper = require('../helpers/auth.js')

//SIGNUP ROUTE - show a signup page
router.get('/signup', function(req, res){
  res.render('users/signup.hbs');
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
      res.render('users/show.hbs', {user: user});
    })
})

//CREATE ROUTE - receives data from signup form, creates new user
router.post('/', authHelper.createSecure, function(req, res){
  var user = new User({
    username: req.body.username,
    password: req.body.hashedPassword,
    email: req.body.email,
    todos_assigned: [],
    todos_created: []
  })
  user.save(function(err, user){
    if(err) console.log(err);
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
