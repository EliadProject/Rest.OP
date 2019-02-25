// Get dependencies
require('rootpath')();
const express = require('express')
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path');
const bodyParser = require('body-parser');
var mongoose = require('mongoose');
const cors = require('cors');
const errorHandler = require('src/app/helpers/error-handler');
const createCountMinSketch = require('count-min-sketch') 
const UsersFunctions =require('./backend/DB/Functions/Users_Functions')



//const socket_tables = require('./backend/tables-socket');

var event = require('./backend/routes/event');

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// api routes
app.use('/users', require('src/app/users/users.controller'));

// global error handler
app.use(errorHandler);

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist/my-app')));

// Set our api routes
app.use('/event', event);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  //res.sendfile("client-test.html")
  res.sendFile(path.join(__dirname, 'dist/my-app/index.html'));
});

app.post('*', (req, res) => {
  res.send('post works');
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



//get functions
var event_Functions = require('./backend/DB/Functions/Events_Functions');
var tablesJSON = [];


var eventsTempStatus = {}
//Create data structure
var sketch = createCountMinSketch()

mongoose.connect('mongodb+srv://restio:Aa123456@webapp-cpe2k.azure.mongodb.net/test?retryWrites=true');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(callback) {
	console.log('Successfully connected - MongoDB');
   
    //Whenever someone connects this gets executed
	io.on('connection', function(socket) {
	
	//get the closest event to the current date 
  event_Functions.getNextEventID(function (response) {
		let nextEventID = response;
		console.log("Got next event "+nextEventID)

	  //if room is state list is not exist, create one
	  if(!eventsTempStatus[nextEventID])
		  eventsTempStatus[nextEventID]= []
		

	  //join user to room by next event
	  console.log("Hello new user, you are at room: " + nextEventID)
    socket.join(nextEventID)


    event_Functions.getTables(nextEventID, function (response) {
      //user joined, send all tables status by event id
      socket.emit("all-tables", { description: response })
    })

	
    //send all temporary data of next event
    socket.emit("all-temp-status", { description: eventsTempStatus[nextEventID] })
	});
  



	//on select, update hash table of 
	socket.on('table-select', function(tableChange) {
		//extract room ID
		let roomID=  Object.keys(socket.rooms)[0]
		roomID = parseInt(roomID)
		
		//update CMS counter of the event of the selection 
		sketch.update(roomID, 1)
  
		//checks if roomID is exists
		if(!eventsTempStatus[roomID])
			{
			
			  eventsTempStatus[roomID] = []
			}
		//insert new value to list
	
		eventsTempStatus[roomID].push(tableChange.newTable)
		///remove old value from list
		let lastIndex = eventsTempStatus[roomID].indexOf(tableChange.lastTable) ;
    if(lastIndex  !== -1){ // only if  appear in the array
				eventsTempStatus[roomID].splice(lastIndex,1);   
		}
	  //broadcast the change to other sockets within room
	  socket.to(roomID).emit('table-changed',{ description: tableChange})
	 	 
})

	socket.on('change-event-time',function(data){
		 //extract current room id from user
		 console.log("socket: " + socket.id + " entered change-event-time function, hello there!")
		 let roomID=  Object.keys(socket.rooms)[0]
		 roomID =parseInt(roomID)
		 //exit the room
		 socket.leave(roomID);
		 
		 //retrieve the current selected table from data 
		 const selectedTable =  data.selectedTable
		
		 //if not null - delete it from hash map, and broadcast to ex-room

		 //checks if roomID is exists
		 if(!eventsTempStatus[roomID]){
				 eventsTempStatus[roomID] = []
		 }
		 else
		 {
		 	let lastIndex = eventsTempStatus[roomID].indexOf(selectedTable) ;
		 	if(lastIndex  !== -1){ // only if  appear in the array remov from list
			eventsTempStatus[roomID].splice(lastIndex,1);

		 }
		}
		
		

		 //update all the others users within in room to remove selection of this table is if selcted
			 if(selectedTable){
				let tableChange = { lastTable : selectedTable, newTable : 0 }
				socket.to(roomID).emit('table-changed',{ description: tableChange})
			}

			

// NOW WORKING ON NEW ROOM
		

		 //retrieve the new event ID from data
		 let eventID = data.eventID	
		 eventID = parseInt(eventID)
		 //update CMS counter
		 sketch.update(eventID, 1)
		 //join the user to the room
		 socket.join(eventID)
		 
		 //if list is not created for event key - create empty list
		 if(!eventsTempStatus[eventID]){
		   eventsTempStatus[eventID]= []
		 };


		
		 	//send to user tables status from hash map (before his are updated)
			 socket.emit("all-temp-status", { description: eventsTempStatus[eventID] } )
			 
			//update eventTempStatus.eventID about changes if there is 
			if(typeof selectedTable !== 'undefined')
				eventsTempStatus[eventID].push(selectedTable)


			//if there is a change send it to all users
			if(selectedTable){
				let tableChange = { lastTable : 0, newTable : selectedTable }
				socket.to(eventID).emit('table-changed',{ description: tableChange})
			};
		
		  //clean users selectedByOther 
		  socket.emit("clean-selected-by-other",true)

		  //send the user tables from DB
      event_Functions.getTables(eventID, function (response) {
        socket.emit("all-tables", { description: response })
      });

			//return event popularity to user
			socket.emit("event-popularity",{ description: getCMSpopularity(eventID) })
	
		

		 
	 })
	//Whenever someone disconnects this piece of code executed
	socket.on('disconnect', function () {
	   console.log('A user disconnected');
	})
	socket.on('table-approve', function(tableApprovedID){
		//retrive roomID of user
		let roomID=  Object.keys(socket.rooms)[0]
		roomID =parseInt(roomID)
		 
		//find the table that approved
		//query the db for approve
		
		//broadcast everyone within the room
		socket.to(roomID).emit("all-tables-broadcast",{ description: tablesJSON })

		//update CMS counter
		sketch.update(eventID, 1)
	})
 });
               
})


/**
 * Listen on provided port, on all network interfaces.
 */
http.listen(port, () => console.log(`API running on localhost:${port}`));


function getCMSvalue(key) {
	return sketch.query(key)
}

var mockEvents = [1,2,3,4,5,6,7]
function getCMSpopularity(key){
	let popularity 
	//get all events
	
	//map eventID to frequency
	const frequencyValues =  mockEvents.map(x=>  getCMSvalue(x))
   
	//filtering - retrive all events that has values
	const filterdEvents =  frequencyValues.filter(x=> x !=0 )
	if (typeof filterdEvents !== 'undefined' && filterdEvents.length > 0) {
	//calculate sum of all filter events
	const sum = filterdEvents.reduce((x,y) => x+y)
	
	//make avg 
	const avg = sum/filterdEvents.length

	//make proportaion between avg and value of key
	const frequencyOfChosen = sketch.query(key)
	
	popularity = frequencyOfChosen/avg
  
	//popularity cannot be greater than one
	if(popularity>1){
		popularity = 1
	}
	}
	else
		popularity = 1
	return popularity;
	

}

