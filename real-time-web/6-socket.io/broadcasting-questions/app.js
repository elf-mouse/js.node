var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

io.on('connection', function(client) {
  console.log('Client connected...');

  client.on('question', function(data) {
    // emit the 'question' event on all the other clients connected
    client.broadcast.emit('question', data);
  });
});

server.listen(8080);
