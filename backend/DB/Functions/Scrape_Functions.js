var Scrape = require('../Schemas/Scrape_Schema');


module.exports = {

  createScrape: function (resturant, menu) {
    let scrape = new Scrape({ resturant: resturant, menu: menu })
    scrape.save()
  }
};

