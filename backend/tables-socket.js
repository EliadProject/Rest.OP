var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

let clients = 0;
io.on('connection', function(socket) {

	//initialize  8 namesspaces;
	var nsp = io.of('/08');
	nsp.on('connection', function(socket) {
		console.log('someone connected');
		nsp.emit('hi', 'Hello everyone!');
	});

	var nsp = io.of('/10');
	nsp.on('connection', function(socket) {
		console.log('someone connected');
		nsp.emit('hi', 'Hello everyone!');
	});
var nsp = io.of('/12');
	nsp.on('connection', function(socket) {
		console.log('someone connected');
		nsp.emit('hi', 'Hello everyone!');
});
var nsp = io.of('/14');
	nsp.on('connection', function(socket) {
		console.log('someone connected');
		nsp.emit('hi', 'Hello everyone!');
});
var nsp = io.of('/16');
	nsp.on('connection', function(socket) {
		console.log('someone connected');
		nsp.emit('hi', 'Hello everyone!');
});
var nsp = io.of('/18');
	nsp.on('connection', function(socket) {
		console.log('someone connected');
		nsp.emit('hi', 'Hello everyone!');
});
var nsp = io.of('/20');
	nsp.on('connection', function(socket) {
		console.log('someone connected');
		nsp.emit('hi', 'Hello everyone!');
});
var nsp = io.of('/22');
	nsp.on('connection', function(socket) {
		console.log('someone connected');
		nsp.emit('hi', 'Hello everyone!');
});

	
	
   clients++;
   io.sockets.emit('broadcast',{ description: clients + ' clients connected!'});
   socket.on('disconnect', function () {
      clients--;
      io.sockets.emit('broadcast',{ description: clients + ' clients connected!'});
   });
});


module.exports = io;