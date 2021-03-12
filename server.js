const socketio = require('socket.io');
const http = require('http');
const app = require('./app');
const mongoose = require('mongoose');

const port = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(port);

const io = socketio(server);
require("./api/models/message")
const Message = mongoose.model("Message");

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);

        const newMessage = new Message({
            message: msg
        });
        newMessage.save();
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});