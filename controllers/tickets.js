var express = require('express');
var moment = require('moment');
var router = express.Router();
var Ticket = require('../models/ticket.js');
var List = require('../models/list.js')
var authHelper = require('../helpers/auth.js');

//NEW TICKET - render the form to make new ticket
router.get('/new', function(req, res){
  if(!req.session.currentUser){
    res.redirect('/users/login')
  }
  res.render('tickets/new.hbs', {listId: req.query.listId});
})

//SHOW TICKET - show additional data for the selected ticket
router.get('/:ticketId', function(req, res){
  List.findById(req.query.listId)
    .exec(function(err, list){
      if(err) console.log(err);
      var ticket = list.tickets.id(req.params.ticketId)
      res.render('tickets/show.hbs', {ticket: ticket, listId: req.query.listId})
    })
})

//EDIT TICKET - show edit form for selected ticket
router.get('/:ticketId/edit', function(req, res){
  List.findById(req.query.listId)
    .exec(function(err, list){
      if(err) console.log(err);
      var ticket = list.tickets.id(req.params.ticketId)
      var formatted_deadline =  moment(ticket.deadline).format('YYYY-MM-DD');
      res.render('tickets/edit.hbs', {deadline: formatted_deadline, ticket: ticket, listId: req.query.listId})
    })
});

//CREATE TICKET ROUTE - take data from new ticket form and create a new ticket with auto assignment to logged in user and status of to-do
router.post('/', function(req,res){
  List.findById(req.query.listId)
  .exec(function(err, list){
    if(err) console.log(err);
    list.tickets.push({
      name: req.body.name,
      deadline: moment(req.body.deadline),
      created_by: req.session.currentUser.username,
    })
    list.save();
  })
  res.redirect('/lists');
})

//UPDATE TICKET ROUTE - take data from edit ticket form and modify selected ticket
router.patch('/:ticketId', function(req,res){
  List.findById(req.body.listId)
  .exec(function(err, list){
    if(err) console.log(err);
    var ticket = list.tickets.id(req.params.ticketId)
      ticket.name = req.body.name;
      ticket.deadline = moment(req.body.deadline);
    list.save();
  })
  res.redirect(`/lists/tickets/${req.params.ticketId}/?listId=${req.body.listId}`)

})

module.exports = router;
