//REQUIRE PACKAGES
pry = require('pryjs')
var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require('mongoose');
var session = require('express-session');
var moment = require('moment');
var logger = require('morgan');
var hbs = require('hbs');

//REQUIRE CONTROLLER FILES
var usersController = require('./controllers/users.js');
var sessionsController = require('./controllers/sessions.js');
var ticketsController = require('./controllers/tickets.js');
var listsController = require('./controllers/lists.js');

//START SERVER INSTANCE
var app = express();

//CONNECT DB WITH DB LOCATION EITHER SET BY HEROKU IF USING THE ONLINE VERSION OR SPECIFIED HERE IF USING LOCALHOST
var mongoURI =  process.env.MONGODB_URI || 'mongodb://localhost/todo-tracker';
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

//SET PUBLIC FOLDER FOR LINKING CLIENT-SIDE FILES
app.use(express.static('public'));

//SET ROUTES TO HIT CONTROLLERS
app.use('/users', usersController);
app.use('/sessions', sessionsController);
app.use('/lists/tickets', ticketsController);
app.use('/', listsController);

//CONNECT SERVER TO WORLD :)
app.listen(process.env.PORT || 4000, function(){
  console.log('Server listening on 4000!')
})
