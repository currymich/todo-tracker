var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

var TodoSchema = new Schema({
  name: String,
  deadline: String,
  status: String,
  comments: [String],
  date_created: Date,
  date_updated: Date
});

var UserSchema = new Schema({
  username: String,
  password: String,
  email: String,
  todos_assigned: [TodoSchema],
  todos_created: [TodoSchema],
  date_created: Date,
  date_updated: Date
});

UserSchema.pre('save', function(next){
  now = new Date();
  this.updated_at = now;

  if(!this.created_at){
  this.created_at = now }
  next();
});

TodoSchema.pre('save', function(next){
  now = new Date();
  this.updated_at = now;

  if(!this.created_at){
  this.created_at = now }
  next();
})

var UserModel = mongoose.model('User', UserSchema);
var TodoModel = mongoose.model('Todo', TodoSchema);

module.exports = {
  User: UserModel,
  Todo: TodoModel
}
