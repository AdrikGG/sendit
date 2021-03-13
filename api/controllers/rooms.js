const mongoose = require('mongoose');
const { findById } = require('../models/room');
const Room = require('../models/room');
const User = require('../models/user');

exports.rooms_get = (req, res, next) => {
    res.status(200).json({
        message: 'Rooms were fetched'
    });
}

exports.room_join = (req, res, next) => {
    
}

exports.room_post = (req, res, next) => {
    const room = new Room({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name
    });
    const userId = req.userData.userId;
    console.log(userId);
    User
    .findOneAndUpdate(
        { _id: userId }, 
        { $push: { rooms: room._id } },
        function (error, success) {
            if (error) {
                console.log(eroor);
            } else {
                console.log(success);
            }
        }
    )
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
    room
    .save()
    .then(result => {
        console.log(result);
        res.status(201).json({
            createdRoom: result
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}

exports.room_get = (req, res, next) => {
    const id = req.params.roomId;
    Room.findById(id)
    .exec()
    .then(doc => {
        comsole.log("From database", doc);
        if(doc) {
            res.status(200).json(doc);
        } else {
            res.status(404).json({message: 'No valid entry founr for given id'});
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
}

exports.room_delete = (req, res, next) => {
    const id = req.params.roomId;
    Room.remove({_id: id})
    .exec()
    .then(result => {
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}