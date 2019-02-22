var Event = require('./models/event.js');


module.exports = {
    tables: async function() {

        let newDate = new Date();
        newDate.setHours(10,0,0);
        var tablesJSON = [];

            await Event.findOne({
                //"startTime": {"$gte": newDate},
                "endTime": {"$lt": new Date(2022, 7, 15)}
            }).exec(function(err, res) {
                if (err) throw err;
                if(res) { 
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

    
    sayHello: function() {
    return "hello";
    }
};

