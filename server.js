// Get dependencies
const express = require('express')
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path');
const bodyParser = require('body-parser');
var mongoose = require('mongoose');



// Get our API routes
const api = require('./backend/routes/api');
//const socket_tables = require('./backend/tables-socket');

var tables = require('./db/tables');

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist/my-app')));

// Set our api routes
app.use('/api', tables);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  //res.sendfile("client-test.html")
  res.sendFile(path.join(__dirname, 'dist/my-app/index.html'));
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */


io.set('origins', '*:*');

 
/*
mongoose.connect('mongodb://localhost/testRest', function (err) {
    if (err) throw err;
     
    console.log('Successfully connected');
	 

tablesJSON = [];

    tables.find({
		
    }).exec(function(err, res) {
		if (err) throw err;
			
		tablesJSON = res;
        //console.log(res);
    });
	 


});
*/


//Dummy Tables
tablesJSON = [{
	"id":1,
	"status":1
	},{"id":2,
	"status":1  },{"id":3,
	"status":1  },{"id":4,
	"status":1  },{"id":5,
	"status":1  },{"id":6,
	"status":1  }]


//Generate Tables
//let tables = JSON.parse(tablesJSON);

var eventsTempStatus = {}
var nextEventID = 555
//Whenever someone connects this gets executed
io.on('connection', function(socket) {
	

	//amir - I need here the closest event to the current date 
	
	//if room is state list is not exist, create one
	if(!eventsTempStatus.nextEventID)
		eventsTempStatus.nextEventID= []
		
	//join user to room by next event
	console.log("Hello new user, you are at room: " + nextEventID)
	socket.join(nextEventID)
	
  //amir - i need here query of all tables within eventID 

	//user joined, send all tables status by event id 
	socket.emit("all-tables",{ description: tablesJSON })
	
	//send all temporary data of next event
	socket.emit("all-temp-status", { description: eventsTempStatus.nextEventID } )

	//on select, update hash table of 
	socket.on('table-select', function(tableChange) {
		//update the status in the list 
		
		//insert new value to list
		eventsTempStatus.nextEventID.push(tableChange.newTable)
		///remove old value from list
		let lastIndex = eventsTempStatus.nextEventID.indexOf(tableChange.lastTable) ;
       if(lastIndex  !== -1){ // only if  appear in the array
				eventsTempStatus.nextEventID.splice(lastIndex,1);   
			 }
			 
	 //broadcast the change to other sockets within room
	 Object.keys(socket.rooms).forEach(function(room){
		socket.to(room).emit('table-changed',{ description: tableChange})
	
});
		 
	 })
	//Whenever someone disconnects this piece of code executed
	socket.on('disconnect', function () {
	   console.log('A user disconnected');
	})
	socket.on('table-approve', function(tableApproved){
		tablesJSON[tableApproved-1].status=2
		console.log(tablesJSON)
		//broadcast everyone
		io.sockets.emit("all-tables-broadcast",{ description: tablesJSON })
	})
 });
 





/**
 * Listen on provided port, on all network interfaces.
 */
http.listen(port, () => console.log(`API running on localhost:${port}`));