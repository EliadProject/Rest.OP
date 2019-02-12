
var mongoose = require('mongoose');
 
var tablesSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    id:Number,
    chairs:Number,
    orders: [
        {
            userId: Number,
            startTime: { 
                type: Date,
                default: Date.now
            },
            endTime: { 
                type: Date,
                default: Date.now
            }
        }
    ],

});
 
var Tables = mongoose.model('Tables', tablesSchema);
 
module.exports = Tables;