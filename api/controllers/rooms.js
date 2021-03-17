const mongoose = require('mongoose');
const { findById } = require('../models/room');
const Room = require('../models/room');
const User = require('../models/user');

mongoose.set('useFindAndModify', false);

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
    // console.log(userId);
    const user = User
    .findOneAndUpdate(
        { _id: userId }, 
        { $push: { rooms: room._id } }
    )
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
    console.log("Post create room");
    console.log(user);

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
        console.log("From database", doc);
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
    const userId = req.userData.userId;
    User.findOneAndUpdate(
        { _id: userId }, 
        { $pull: { rooms: id } }
    )
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}