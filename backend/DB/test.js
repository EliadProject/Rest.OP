var mongoose = require('mongoose');
var functions =  require('./Functions/Users_Functions.js');
mongoose.connect('mongodb+srv://restio:Aa123456@webapp-cpe2k.azure.mongodb.net/test?retryWrites=true');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(callback) {
     //functions.addUser("admin1","admin1" )
     functions.canAuth("admin1","admin1",function(response){
            let res = response 
            console.log(res)
            })
               
})