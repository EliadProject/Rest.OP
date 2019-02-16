// Get dependencies
const express = require('express')
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http).listen(http);
const path = require('path');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
const bodyParser = require('body-parser');
var mongoose = require('mongoose');

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

var db = mongoose.connection;

//use sessions for tracking logins
app.use(session({
	secret: 'EliadHayAmir',
	resave: true,
	saveUninitialized: false,
	store: new MongoStore({
	  mongooseConnection: db
	})
}));

// Get our API routes
const api = require('./backend/routes/api');
//const socket_tables = require('./backend/tables-socket');

// import db module
var tables = require('./db/tables');

// import users logic
var users = require('./users/userDB');
var users = require('./users/user');
app.use('/', users);


// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist/my-app')));

// Set our api routes
app.use('/api', tables);

// Catch all other routes and return the index file
app.get('/mainTables', (req, res) => {
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
	"status":1
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
	socket.on('table-select', function(tableChange) {
		//broadcast the rest of the users
		socket.broadcast.emit('table-changed',{ description: tableChange})
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