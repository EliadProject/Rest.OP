var Event = require('../models/event.js');


module.exports = {

  getTables: function (id, callback) {
    var tablesJSON = [];
    Event.findOne({ "_id": id }, function (err, res) {
      if (err) return console.error(err)
      else if(res) {
        var len = res.tables.length
        for (var i = 0; i < len; i++) {
          tablesJSON.push({
            id: res.tables[i]._id,
            status: res.tables[i].userId ? 2 : 1
          });
        }
        return callback(tablesJSON)
      }

    })
  },
  getNextEventID: function (callback) {
    Event.findOne({ "startTime": { $gte: new Date() } }, function (err, res) {
      if (err) return console.error(err)
      else {
        return callback(res._id)
      }

    })
  },

};

