var User = require('../Schemas/Users_Shema');
module.exports = {
   
    addUser: function(username) {
        let user = new User({username: 'user1'})
        user.save()
    },
    getUserByID: function(id,callback){
         User.findOne({id:id},function(err,res){
            if (err) return console.error(err)
            else {    
                return callback(res)
            }

        })
    },
    getAllUsers: function(callback){
        User.find({},function(err,res){
            if (err) return console.error(err)
            else {    
                return callback(res)
            }
        })
    },
    canAuth: function(username,password,callback){
        User.find({username:username,password:password},function(err,res){
            if (err) return console.error(err)
            else {    
                return callback(res)
            }
        })
    },
    
    
   
    
    
};