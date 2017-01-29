var express = require('express');
var moment = require('moment');
var router = express.Router();
var Ticket = require('../models/ticket.js');
var List = require('../models/list.js')
var authHelper = require('../helpers/auth.js');

//LIST INDEX - MAIN SITE HOMEPAGE
router.get('/lists', function(req, res){
  List.find({})
    .exec(function(err, lists){
      if(err) console.log(err);
      res.render('lists/index.hbs', {lists: lists})
    })
})

//NEW LIST ROUTE
router.get('/lists/new', function(req,res){
  res.render('lists/new.hbs')
})

//CREATE ROUTE FOR LISTS - take data from new ticket form and create a new ticket with auto assignment to logged in user and status of to-do
router.post('/lists', function(req,res){
  var list = new List({
    name: req.body.name
  })
  list.save(function(err, list){
    if(err) console.log(err);
    res.redirect('/lists');
  })
});

//HOMEPAGE REDIRECT
router.get('/', function(req, res){
  res.redirect('/lists')
})

module.exports = router;
