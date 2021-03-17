const express = require("express");
const router = express.Router();

const checkAuth = require('../middleware/check-auth');
const User = require('../models/user');
const Room = require('../models/room');

router.post('/dashboard', checkAuth, (req, res, next) => {
    console.log(req.userData);
    const userId = req.userData.userId;
    User.findById(userId)
    .select("rooms")
    .exec()
    .then(async docs => {
        console.log(docs);
        let roomArray = [];
        for (let index = 0; index < docs.rooms.length; index++) {
            const doc = docs.rooms[index];
            let room = await Room.findById(doc._id);
            if(!room) {
                return;
            }
            if(room.messages.length < 1) {
                newroom = {
                    roomId: room._id,
                    roomName: room.name,
                    lastMessage: "No messages"
                }
            } else {
                newroom = {
                    roomId: room._id,
                    roomName: room.name,
                    lastMessage: room.messages[room.messages.length-1]
                }
            }
            // console.log(room);
            roomArray.push(newroom);
            console.log(newroom.roomId, newroom.roomName);
        }
        // console.log(roomArray);
        res.status(200).json({rooms: roomArray});
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
})

module.exports = router;