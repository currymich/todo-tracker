//REQUIRE PACKAGES
var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require('mongoose');
var session = require('express-session');
var logger = require('morgan');
var hbs = require('hbs');

//REQUIRE CONTROLLER FILES
var usersController = require('./controllers/users.js');

//START SERVER AND CONNECT DB
var app = express();

var mongoURI =  process.env.MONGODB_URI || 'mongodb://localhost/todo-tracker';
mongoose.connect(mongoURI);

//CONFIGURE MIDDLEWARE/PACKAGES
app.set('view engine', 'hbs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(logger('dev'));
app.use(methodOverride('_method'));

app.use(session({
  secret: "SuperDuperSecretPass",
  resave: false,
  saveUninitialized: false
}));

app.use('/users', usersController);

app.listen(process.env.PORT || 4000, function(){
  console.log('Server listening on 4000!')
})
