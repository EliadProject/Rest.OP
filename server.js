// Get dependencies
const express = require('express')
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path');
const bodyParser = require('body-parser');




// Get our API routes
const api = require('./backend/routes/api');
//const socket_tables = require('./backend/tables-socket');

var tables = require('./routes/tables');

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

//Dummy Tables
tablesJSON = [{
	"id":1,
	"status":2
	},{"id":2,
	"status":1  },{"id":3,
	"status":1  },{"id":4,
	"status":1  },{"id":5,
	"status":1  },{"id":6,
	"status":1  }]

//Generate Tables
//let tables = JSON.parse(tablesJSON);


//Whenever someone connects this gets executed
io.on('connection', function(socket) {
	console.log('A user connected')
	socket.emit("all-tables",{ description: tablesJSON })
	socket.on('table-select', function(tableIndex) {
		console.log(tableIndex);
		//broadcast the rest of the users
		socket.broadcast.emit('table-changed',{ description: tableIndex})
	 });
	//Whenever someone disconnects this piece of code executed
	socket.on('disconnect', function () {
	   console.log('A user disconnected');
	});
 });
 





/**
 * Listen on provided port, on all network interfaces.
 */
http.listen(port, () => console.log(`API running on localhost:${port}`));