const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const checkAuth = require('../middleware/check-auth');
const UserController = require('../controllers/users');

router.post('/signup', UserController.user_signup);

router.post('/login', UserController.user_login);

router.get('/', UserController.users_get);

router.post('/', UserController.user_post);

router.get('/:userId', UserController.user_get);

router.patch('/:userId', UserController.user_update);

router.delete('/:userId', checkAuth, UserController.user_delete);

module.exports = router;