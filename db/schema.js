var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

var TicketSchema = new Schema({
  name: String,
  deadline: Date,
  status: String,
  comments: [String],
  created_by: String,
  assigned_to: [String],
  date_created: Date,
  date_updated: Date
});

var UserSchema = new Schema({
  username: String,
  password_digest: String,
  email: String,
  tickets_assigned: [TicketSchema],
  tickets_created: [TicketSchema],
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

TicketSchema.pre('save', function(next){
  now = new Date();
  this.updated_at = now;

  if(!this.created_at){
  this.created_at = now }
  next();
})

var UserModel = mongoose.model('User', UserSchema);
var TicketModel = mongoose.model('Ticket', TicketSchema);

module.exports = {
  User: UserModel,
  Ticket: TicketModel
}
