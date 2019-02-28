var userFunctions = require('./Users_Functions')

module.exports = {
    getStats: function(callback) {
        userFunctions.getUserLocationMap(function (res){
            return callback(res)
        })
    }
};