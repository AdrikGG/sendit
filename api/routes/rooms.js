const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check-auth');
const RoomController = require('../controllers/rooms');

router.get('/', RoomController.rooms_get);

router.post('/join', checkAuth, RoomController.room_join);

router.post('/create', checkAuth, RoomController.room_post);

router.patch('/:roomId', checkAuth, RoomController.room_patch);

router.get('/:roomId', checkAuth, RoomController.room_get);

router.delete('/:roomId', checkAuth, RoomController.room_delete);

module.exports = router;