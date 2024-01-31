const socketio = require('socket.io');
const http = require('http');
const app = require('./app');
const jwt = require('jsonwebtoken');
// const mongoose = require('mongoose');
require('dotenv').config();

const port = process.env.PORT || 3000;

const server = http.createServer(app);

const User = require('./api/models/user');
const Room = require('./api/models/room');

const io = socketio(server, {
  cors: {
    origin: 'http://localhost:3001',
    methods: ['GET', 'POST']
  }
});
const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');

io.on('connection', (socket) => {
  console.log('Connection (server)');
  const id = socket.handshake.query.id;
  socket.join(id);

  socket.on('join', async ({ token, roomId }) => {
    console.log('In join (server)');
    try {
      const room = await findRoom(roomId);

      const userData = jwt.verify(token, process.env.JWT_SECRET);

      addUser({
        sid: socket.id,
        username: userData.username,
        roomId: room._id
      });

      socket.broadcast.to(roomId).emit('message', {
        username: 'bot',
        text: `${userData.username}, has joined!`
      });

      socket.join(roomId);

      io.to(roomId).emit('roomData', {
        room: roomId,
        users: getUsersInRoom(roomId)
      });
    } catch (error) {
      console.log(error);
    }
  });

  socket.on('send message', async (message, roomId) => {
    console.log('In send message (server)');
    const user = getUser(socket.id);
    if (!user) {
      console.log('Server restart needed');
    }

    const newMessage = {
      username: user.username,
      text: message
    };

    // commit massage to the database
    await Room.findByIdAndUpdate(
      { _id: roomId },
      { $push: { messages: newMessage } }
    ).catch((err) => {
      console.log(err);
    });

    await findRoom(roomId);

    console.log('after message commit');

    io.to(roomId).emit('message', { username: user.username, text: message });
    io.to(roomId).emit('roomData', {
      room: roomId,
      users: getUsersInRoom(roomId)
    });
  });

  socket.on('disconnect', (roomId) => {
    const user = removeUser(socket.id);
    console.log('A user has disconnected');
    if (user) {
      io.to(roomId).emit('roomData', {
        room: roomId,
        users: getUsersInRoom(roomId)
      });
    }
  });
});

async function findRoom(roomId) {
  let room;
  await Room.findById(roomId)
    .then((result) => {
      console.log(result);
      room = result;
    })
    .catch((err) => {
      console.log(err);
    });

  return room;
}

server.listen(port);
