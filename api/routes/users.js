const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check-auth');
const UserController = require('../controllers/users');

router.post('/signup', UserController.user_signup);

router.post('/login', UserController.user_login);

router.get('/users', UserController.users_get);

router.post('/', UserController.user_post);

router.get('/username', checkAuth, UserController.user_get);

router.patch('/:userId', checkAuth, UserController.user_update);

router.delete('/:userId', checkAuth, UserController.user_delete);

module.exports = router;
