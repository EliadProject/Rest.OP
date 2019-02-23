var User = require('../Schemas/Users_Shema');
module.exports = {
   
    addUser: function(username) {
        let user = new User({username: 'user1'})
        user.save()
    },
    getUserByID: function(username,callback){
         User.findOne({username:username},function(err,res){
            if (err) return console.error(err)
            else {
               
                return callback(res)
            }

        })
    }
   
    
    
};