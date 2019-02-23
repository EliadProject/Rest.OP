var mongoose = require('mongoose');
  // we're connected!
var usersShema = new mongoose.Schema({
    id: Number,
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    role: String
});
  
var User = mongoose.model('User', usersShema);

module.exports = User;

