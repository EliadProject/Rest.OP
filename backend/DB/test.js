var mongoose = require('mongoose');
var menusFunctions =  require('./Functions/Menus_Functions');
var eventsFunctions =  require('./Functions/Events_Functions');
mongoose.connect('mongodb+srv://restio:Aa123456@webapp-cpe2k.azure.mongodb.net/test?retryWrites=true');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(callback) {
     
    eventsFunctions.createEvent("Morning",4)
               
})