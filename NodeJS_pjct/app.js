const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const chatHistory = []

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});


io.on('connection', function (socket) {
  console.log('a user connected');


  socket.on('disconnect', function () {
    console.log('user disconnected');
  });

  socket.on('chat message', function (msg) {
    console.log('message: ' + msg);
    const messageData = {
      message: msg.message,
      sender: socket.id,
      timestamp: new Date().toLocaleString()
    };

    io.emit('chat message', messageData);
  });

  
  io.emit('chat history', chatHistory);
});

http.listen(3550, function () {
  console.log('listening on *:3550');
});

