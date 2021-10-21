const usersRoutes = require('express').Router();
const { getMe, getProfileInfo } = require('../controllers/users');
const { validateUpdateProfile } = require('../middlewares/celebrate');

usersRoutes.get('/me', getMe);
usersRoutes.patch('/me', validateUpdateProfile, getProfileInfo);

module.exports = usersRoutes;
