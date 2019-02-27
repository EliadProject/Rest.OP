var userFunctions = require('./Users_Functions')

module.exports = {
    getStats: function(callback) {
        userFunctions.groupByRole(function (res){
            return callback(res)
        })
    }
};