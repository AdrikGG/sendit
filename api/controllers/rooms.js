exports.rooms_get = (req, res, next) => {
    res.status(200).json({
        message: 'Rooms were fetched'
    });
}

exports.room_post = (req, res, next) => {
    const room = {
        roomname: req.body.roomname,
        roomId: req.body.roomId
    };
    res.status(201).json({
        message: 'Room was created',
        room: room
    });
}

exports.room_get = (req, res, next) => {
    res.status(200).json({
        message: 'Room details',
        roomId: req.params.roomId
    });
}

exports.room_delete = (req, res, next) => {
    res.status(200).json({
        message: 'Room deleted',
        roomId: req.params.roomId
    });
}