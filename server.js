const socketio = require('socket.io');
const http = require('http');
const app = require('./app');
const jwt = require('jsonwebtoken');
// const mongoose = require('mongoose');

const port = process.env.PORT || 3000;

const server = http.createServer(app);

const User = require('./api/models/user');
const Room = require('./api/models/room');

const io = socketio(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});
const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');

io.on('connection', (socket) => {
    console.log("Connection (server)");
    const id = socket.handshake.query.id;
    socket.join(id);


    socket.on('join', async ({ token, roomId }) => {
        console.log("In join (server)");
        const room = await findRoom(roomId);
        const userData = jwt.verify(token, "somethingspecial");
        
        // console.log(userData);
        // console.log(room);
        // console.log(room.name);
        addUser({ sid: socket.id, username: userData.username, roomName: room.name });

        socket.emit('message', { username: 'bot', text: `${userData.username}, welcome to ${room.name}` });
        socket.broadcast.to(roomId).emit('message', { username: 'bot', text: `${userData.username}, has joined!`});

        socket.join(roomId);

        io.to(roomId).emit('roomData', {room: roomId, users: getUsersInRoom(roomId)})
    });

    socket.on('send message', async (message, roomId) => {
        console.log("In send message (server)");
        const user = getUser(socket.id); 

        console.log(message);

        // commit massage to the database
        await Room.findOneAndUpdate(
            {_id: roomId},
            { $push: { messages: message } }
        )
        .catch(err => {
            console.log(err);
        });

        io.to(roomId).emit('message', { username: user.username, text: message });
        io.to(roomId).emit('roomData', {room: roomId, users: getUsersInRoom(roomId)})
    });

    socket.on('disconnect', (roomId) => {
        const user = removeUser(socket.id);
        console.log('A user has disconnected');
        if(user) {
            io.to(roomId).emit('roomData', {room: roomId, users: getUsersInRoom(roomId)});
        }
    });
});

async function findRoom(roomId) {
    let room;
    await Room.findById(roomId)
    .then(result => {
        console.log(result);
        room = result;
    })
    .catch(err => {
        console.log(err);
    });

    return (
        room
    );
}

server.listen(port);