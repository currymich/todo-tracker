var express = require('express');
var router = express.Router();
var User = require('../models/user.js');
var Ticket = require('../models/ticket.js');
var authHelper = require('../helpers/auth.js');

 //INDEX OF ALL TICKETS
router.get('/', function(req, res){
  Ticket.find()
    .exec(err, tickets){
      if(err) console.log(err);
      res.render('tickets/index.hbs', {tickets: tickets})
    }
})

 //NEW TICKET FORM


 //CREATE TICKET ROUTE
