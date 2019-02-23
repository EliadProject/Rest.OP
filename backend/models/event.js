
var mongoose = require('mongoose');
 
var eventsSchema = mongoose.Schema({
    //_id: mongoose.Schema.Types.ObjectId,
    id:Number,
    startTime: { 
        type: Date,
        default: Date.now
    },
    endTime: { 
        type: Date,
        default: Date.now
    },
    tables: [
        {
            userId: Number
        }
    ]
});
 
var Events = mongoose.model('events', eventsSchema);
 
module.exports = Events;
