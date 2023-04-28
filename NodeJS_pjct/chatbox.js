const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const users = {};
const chatHistory = [];

// app.use(express.static('public'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/chat.html');
});

io.on('connection', function (socket) {
    console.log('a user connected');

    socket.on('disconnect', function () {
        console.log('user disconnected');

        // remove user from the users object
        delete users[socket.id];

        // emit updated user list and chat history to all clients
        io.emit('user list', getUsers());
        io.emit('chat history', chatHistory);
    });

    socket.on('user join', function (name) {
        console.log(`${name} joined`);

        // add user to the users object
        users[socket.id] = {
            name: name
        };

        // emit updated user list and chat history to all clients
        io.emit('user list', getUsers());
        io.emit('chat history', chatHistory);
    });

    socket.on('chat message', function (data) {
        console.log(`${users[socket.id].name}: ${data.message}`);

        const messageData = {
            message: data.message,
            sender: users[socket.id].name,
            timestamp: new Date().toLocaleString()
        };

        chatHistory.push(messageData);
        io.emit('chat message', messageData);
    });

    socket.on('request chat history', function () {
        socket.emit('chat history', chatHistory);
    });
});

function getUsers() {
    const userArray = [];
    for (const [id, user] of Object.entries(users)) {
        userArray.push({
            id: id,
            name: user.name
        });
    }
    return userArray;
}

http.listen(3000, function () {
    console.log('listening on *:3000');
});