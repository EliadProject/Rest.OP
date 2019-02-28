const request = require('../node_modules/request');
const cheerio = require('../node_modules/cheerio');
var scrape_Functions = require('../backend/DB/Functions/Scrape_Functions');
var mongoose = require('mongoose');


mongoose.connect('mongodb+srv://restio:Aa123456@webapp-cpe2k.azure.mongodb.net/test?retryWrites=true');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log('Successfully connected - MongoDB');

  var keywords = ['Grilled', 'Avocado'];
  scrape_Functions.searchScrape(keywords,console.log);
 // getResturant();


});



function getResturantMenu(url) {
  request(url, (error,
    response, html) => {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html);
      var menu = [];
      $('.row-hover tr').each((i, element) => {
        const item = $(element).text();
        var food = $(element).find("td:nth-child(1)").text()
        var price = $(element).find("td:nth-child(3)").text()

        if (price)
          menu.push({ food, price });
      });

      var name = url.split("/")[3].split("-prices");
      scrape_Functions.createScrape(name[0], menu);
    }

  });
}

function getResturant() {
  const numRest = 6;
  request('https://www.fastfoodmenuprices.com/all-restaurants/', (error,
    response, html) => {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html);
      var anchors = [];
      var links = $('.entry-content a');
      links.each(function (i, link) {
        anchors[i] = $(link).attr("href");
        getResturantMenu(anchors[i]);
        if (i == numRest) return false;
      });
    }

  });

}
