var Event = require('../Schemas/Events_Schema');
var Menu = require('../Schemas/Menus_Shema')
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
  createEvent:function(menuType,tablesNum,startTime,endTime){
    //get MenuID
    Menu.findOne({ "type" : menuType }, function (err, res) {
      let menuID
      if (err)
        return console.error(err)
      else{
        if(res)
          menuID = res._id 
        else
          menuID = undefined
      }
    
      //pares table number to array
      let tables = []
      for (i=0;i<tablesNum;i++){
        tables.push({})
      }

      let event = new Event({startTime: startTime, endTime:endTime,menuID: menuID, tables: tables})
      event.save()
    })

  },
  approveTable : function(eventID,tableID,userID, callback){
      Event.update({_id: eventID,
  'tables._id' : tableID},  
    {$set: {'tables.$.userId' : userID} }, function (err, res){
      if (err)  console.error(err)
      else {
        callback(true)//finished
      }
    })
     

   
  }


};

