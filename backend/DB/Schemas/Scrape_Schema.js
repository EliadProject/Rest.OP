var mongoose = require('mongoose');

var scrapeShcema = new mongoose.Schema({
    resturant: String,
    menu: [
      {
        food: String,
        price: String
      }
    ]
});
  
var Menu = mongoose.model('scrape', scrapeShcema);

module.exports = Menu;

