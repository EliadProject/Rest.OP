var mongoose = require('mongoose');
  // we're connected!
var menusShema = new mongoose.Schema({
    type: String,
    description: String
});
  
var Menu = mongoose.model('Menus', menusShema);

module.exports = Menu;

