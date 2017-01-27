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

// var mongoURI =  process.env.MONGODB_URI || 'mongodb://localhost/todo-tracker';
var mongoURI = 'mongodb://localhost/todo-tracker';
mongoose.connect(mongoURI);

// Now that we're connected, let's save that connection to the database in a variable.
var db = mongoose.connection;

// Will log an error if db can't connect to MongoDB
db.on('error', function(err){
  console.log(err);
});

// Will log "database has been connected" if it successfully connects.
db.once('open', function(){
  console.log('database connected!');
});

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

app.get('/', function(req,res){
  res.send('hurray homepage!')
})

app.listen(process.env.PORT || 4000, function(){
  console.log('Server listening on 4000!')
})
