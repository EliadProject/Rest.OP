var User = require('../Schemas/Users_Shema');
module.exports = {
   
    addUser: function(username) {
        let user = new User({username: 'user1'})
        user.save()
    },
    getUserByID: function(id,callback){
         User.findOne({_id:id},function(err,res){
            if (err) return console.error(err)
            else {    
                return callback(res)
            }

        })
    },
    getAllUsers: function(callback){
        User.find({}, {_id:0, password:0, draggable:0},function(err,res){
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
    groupByRole: function(callback){
        User.aggregate([{$group : { _id:'$role', count : {$sum : 1 } }}],function(err,res){
            if (err) return console.error(err)
            else {    
                return callback(res)
            }
        })
    },
    getUserLocationMap: function(callback){
        User.find({},{lat:1, lng:1, label:1, draggable:1, _id:0},function(err,res){
            if (err) return console.error(err)
            else {    
                return callback(res)
            }
        })
    },
    deleteUser: function(id,callback){
        User.deleteOne({_id: id },function(err,res){
            if (err) return console.error(err)
            else {    
                return callback(res)
            }
        })
    },
    
    
};