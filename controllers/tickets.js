var express = require('express');
var moment = require('moment');
var router = express.Router();
var Ticket = require('../models/ticket.js');
var authHelper = require('../helpers/auth.js');


//INDEX OF ALL TICKETS
router.get('/tickets', function(req, res){
  if(!req.session.currentUser){
    res.redirect('/users/login')
  }

  Ticket.find({})
    .exec(function(err, tickets){
      if(err) console.log(err);
      res.render('tickets/index.hbs', {tickets: tickets, currentUser: req.session.currentUser})
    })
})

//NEW TICKET - render the form to make new ticket
router.get('/tickets/new', function(req, res){
  if(!req.session.currentUser){
    res.redirect('/users/login')
  }
  res.render('tickets/new.hbs');
})

//SHOW TICKET - show additional data for the selected ticket
router.get('/tickets/:ticketId', function(req, res){
  Ticket.findById(req.params.ticketId)
    .exec(function(err, ticket){
      if(err) console.log(err);
      res.render('tickets/show.hbs', {ticket: ticket})
    })
})

//CREATE TICKET ROUTE - take data from new ticket form and create a new ticket with auto assignment to logged in user and status of to-do
router.post('/', function(req,res){
  var ticket = new Ticket({
    name: req.body.name,
    status: 'To Do',
    created_by: req.session.currentUser.username,
    deadline: moment(req.body.deadline),
    assigned_to: req.session.currentUser.username,
    comments: []
  })
  ticket.save(function(err, ticket){
    if(err) console.log(err);
    res.redirect('/tickets');
  })
});

//EDIT TICKET - show edit form for selected ticket
router.get('/tickets/:ticketId/edit', function(req, res){
  Ticket.findById(req.params.ticketId)
    .exec(function(err, ticket){
      var formatted_deadline =  moment(ticket).format('YYYY-MM-DD');
      console.log(formatted_deadline)
      if(err) console.log(err);
      res.render('tickets/edit.hbs', {deadline: formatted_deadline, ticket: ticket})
    })
});

//UPDATE TICKET ROUTE - take data from edit ticket form and modify selected ticket
router.patch('/:ticketId', function(req,res){
  Ticket.findByIdAndUpdate(req.params.ticketId, {
    name: req.body.name,
    status: 'To Do',
    deadline: moment(req.body.deadline),
    assigned_to: req.session.currentUser.username
  }, {new: true})
  .exec(function(err, ticket){
    if(err) console.log(err);
    // console.log(ticket);
    res.redirect('/tickets/' + ticket._id)
  })
})

//REDIRECT HOMEPAGE TO TICKETS INDEX
router.get('/', function(req,res){
  if(req.session.currentUser){
    res.redirect('/tickets')
  } else {
    res.redirect('/users/login')
  }

})

module.exports = router;
