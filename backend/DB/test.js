var mongoose = require('mongoose');
var menusFunctions =  require('./Functions/Menus_Functions');
var eventsFunctions =  require('./Functions/Events_Functions');
mongoose.connect('mongodb+srv://restio:Aa123456@webapp-cpe2k.azure.mongodb.net/test?retryWrites=true');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(callback) {
     
    eventsFunctions.createEvent("Morning",4)

    eventsFunctions.approveTable("5c7065dd07b3f145bc9ba056","5c7065dd07b3f145bc9ba05e","5c71867ea04a078d7b3d3fa8")
               
})