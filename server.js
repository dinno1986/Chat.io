
var app = require('express')();
var http = require('http').Server(app);
var express = require('express');
var io = require('socket.io')(http);


http.listen(3000,function(){
	console.log('listening on *:3000');
});

app.use(express.static(__dirname + '/public'));


app.get('/', function(req, res){
res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', function(socket){
  console.log('Welcome ');

  socket.on('disconnect', function(){
    console.log('Adios amigos');
  });
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
  });
});

io.emit('some event', { for: 'everyone' });

io.on('connection', function(socket){
  socket.broadcast.emit('Salut mon pote');
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});


