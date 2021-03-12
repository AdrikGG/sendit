const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Rooms were fetched'
    });
});

router.post('/', checkAuth, (req, res, next) => {
    const room = {
        roomname: req.body.roomname,
        roomId: req.body.roomId
    };
    res.status(201).json({
        message: 'Room was created',
        room: room
    });
});

router.get('/:roomId', checkAuth, (req, res, next) => {
    res.status(200).json({
        message: 'Room details',
        roomId: req.params.roomId
    });
});

router.delete('/:roomId', checkAuth, (req, res, next) => {
    res.status(200).json({
        message: 'Room deleted',
        roomId: req.params.roomId
    });
});

module.exports = router;