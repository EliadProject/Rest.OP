var Menu = require('../Schemas/Menus_Shema');
module.exports = {
   
    createMenu : function(type,description){
        let menu = new Menu({type: type, description:description})
        menu.save()
    },
    getAllMenus: function(callback){
        Menu.find({},function(err,res){
            if (err) return console.error(err)
            else {    
                return callback(res)
            }
        })
    }
   
    
    
};