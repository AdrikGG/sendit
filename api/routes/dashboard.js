const express = require("express");
const router = express.Router();

const checkAuth = require('../middleware/check-auth');
const User = require('../models/user');
const Room = require('../models/room');

router.post('/dashboard', checkAuth, (req, res, next) => {
    // console.log(req.userData);
    const userId = req.userData.userId;
    User.findById(userId)
    .select("rooms")
    .exec()
    .then(docs => {
        console.log(docs);
        const response = []
        docs.rooms.forEach(doc => {
            Room.findById(doc._id)
            .then(result => {
                if(!result) {
                    return;
                }
                if(result.messages.length < 1) {
                    room = {
                        roomId: doc._id,
                        lastMessage: "No messages"
                    }
                } else {
                    room = {
                        roomId: doc._id,
                        lastMessage: doc.messages[doc.messages.length-1]
                    }
                }
                console.log(room);
                response.push(room);
            })
            // res.status(200).json(response);
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
})

module.exports = router;