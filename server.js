// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');




// Get our API routes
const api = require('./backend/routes/api');
//const socket_tables = require('./backend/tables-socket');




const app = express();

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist/my-app')));

// Set our api routes
app.use('/api', api);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
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


const server = http.createServer(app);
const io = require('socket.io').listen(server);

	//initialize  8 namesspaces;
	var nsp = io.of('/08');
	nsp.on('connection', function(socket) {
   
		console.log('someone connected new');
});
nsp.on("tabledChanged",function(tableIndex){
  console.log("Table number: " + tableIndex+ " has changed");
});

io.on("tabledChanged",function(tableIndex){
  console.log("Table number: " + tableIndex+ " has changed");
});






/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));