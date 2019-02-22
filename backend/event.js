var Event = require('./models/event.js');


module.exports = {
  tables: async function () {
    var tablesJSON = [];

    await Event.findOne({
      "startTime": { $gte: new Date() }
    }).sort({"startTime": 1}).exec(function (err, res) {
      if (err) throw err;
      if (res) {
        var len = res.tables.length
        for (var i = 0; i < len; i++) {
          tablesJSON.push({
            id: res.tables[i]._id,
            status: res.tables[i].userId ? 2 : 1
          });
        }
      }
    });
    return tablesJSON;
  },

    
  nextEvent: function () {

  }
};

