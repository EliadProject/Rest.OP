
var mongoose = require('mongoose');
 
var eventsSchema = mongoose.Schema({
    //_id: mongoose.Schema.Types.ObjectId,
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
            userId: {
                
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Users'
                
            }
        }
    ],
    menuID: {
                
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Menus'
    
}
});
 
var Events = mongoose.model('events', eventsSchema);
 
module.exports = Events;
