var Scrape = require('../Schemas/Scrape_Schema');
const AhoCorasick = require('../../../node_modules/aho-corasick-node');

module.exports = {

  createScrape: function (resturant, menu) {
    let scrape = new Scrape({ resturant: resturant, menu: menu })
    scrape.save()
  },
  searchScrape: function (keywords, callback) {
    const builder = AhoCorasick.builder();
    const hits = [];
    var details = [];
    Scrape.find({}, function (err, res) {
      if (err) return console.error(err)
      else {
        var lenRest = res.length;
        keywords.forEach(k => builder.add(k));
        const ac = builder.build();
        for (var i = 0; i < lenRest; i++) {
          var lenMenu = res[i].menu.length
          for (var j = 0; j < lenMenu; j++) {
            //keywords.push(res[i].menu[j].food);
            text = res[i].menu[j].food
            if (ac.match(text).length != 0) {
              hits.push(ac.match(text));
              details.push(res[i].resturant + ':' + res[i].menu[j].food)
            }
          }
        }
        return callback(details)
      }
    })
  }
};
