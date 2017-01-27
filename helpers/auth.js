var bcrypt = require('bcrypt');
var User = require('../models/user.js');

function createSecure(req, res, next) {
  var password = req.body.password;

  res.hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  next();
}

function loginUser(req, res, next) {
  var email = req.body.email;
  var password = req.body.password;
  console.log(password)
  var query = User.findOne({ email: email })
  .exec()
  query.then(function(foundUser){
    console.log(foundUser)
    if (foundUser == null) {
      res.json({status: 401, data: "unauthorized"})

    } else if (bcrypt.compareSync(password, foundUser.password_digest)) {
      req.session.currentUser = foundUser;
    }
    next()
  })
  .catch(function(err){
    res.send('err: ' + err)
  });
}

//create a function called "authorized" that checks if the CurrentUser's id matches the id in params
function authorize(req, res, next) {
  var currentUser = req.session.currentUser;
  if(currentUser){
    if(currentUser._id.toString() === req.params.userId){
      next()
    } else {
      res.send({message: "Sorry, you can only edit your own account", status: 401})
    }
  } else {
    res.send({message: "Sorry, you are not logged in", status: 401})

  }
};

//Export this function below:

module.exports = {
  createSecure: createSecure,
  loginUser: loginUser,
  authorize: authorize
};
