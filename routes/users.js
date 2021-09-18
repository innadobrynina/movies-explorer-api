const usersRoutes = require('express').Router();
const { getMe, updateProfile } = require('../controllers/users');
const { validateUpdateProfile } = require('../middlewares/celebrate');

usersRoutes.get('/me', getMe);
usersRoutes.patch('/me', validateUpdateProfile, updateProfile);

module.exports = { usersRoutes };
