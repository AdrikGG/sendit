const socketio = require('socket.io');
const http = require('http');
const app = require('./app');
const jwt = require('jsonwebtoken');
// const mongoose = require('mongoose');

const port = process.env.PORT || 3000;

const server = http.createServer(app);

const User = require('./api/models/user');
const Room = require('./api/models/room');

const io = socketio(server);
// require("./api/models/message")
// const Message = mongoose.model("Message");
const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');

io.on('connection', (socket) => {
    socket.on('join', ({ token, roomId }) => {
        const userData = jwt.verify(token, "somethingspecial");
        const user = User.findById(userData.userId);
        const room = Room.findById(roomId);
        addUser({ sid: socket.id, username: user.username, roomName: room.name });

        socket.emit('message', { username: 'bot', text: `${user.username}, welcome to ${room.name}` });
        socket.broadcast.to(roomId).emit('message', { username: 'bot', text: `${user.username}, has joined!`});

        socket.join(roomId);

        io.to(roomId).emit('roomData', {room: roomId, users: getUsersInRoom(roomId)})

        callback();
    });

    socket.on('send message', (message, roomId, callback) => {
        const user = getUser(socket.id); 

        // commit massage to the database

        io.to(roomId).emit('message', { username: user.username, text: message });
        io.to(roomId).emit('roomData', {room: roomId, users: getUsersInRoom(roomId)})

        callback();
    });

    socket.on('disconnect', () => {
        const user = removeUser(socket.id);
        console.log('A user has disconnected');
        if(user) {
            io.to(roomId).emit('roomData', {room: roomId, users: getUsersInRoom(roomId)});
        }
    });
});

server.listen(port);