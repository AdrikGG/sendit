const socketio = require('socket.io');
const http = require('http');
const app = require('./app');
const mongoose = require('mongoose');

const port = process.env.PORT || 3000;

const server = http.createServer(app);

const io = socketio(server);
require("./api/models/message")
const Message = mongoose.model("Message");

const activeUsers = {

}

io.on('connection', (socket) => {
    console.log('A user connected');
    // add user id to activeUsers

    socket.on('active room', (roomID) => {
        if(activeUsers[roomID]) {
            
        } else {
            
        }
    })

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);

        const newMessage = new Message({
            message: msg
        });
        console.log(msg);
        newMessage.save();
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
        // remove user id from activeUsers
    });
});

server.listen(port);