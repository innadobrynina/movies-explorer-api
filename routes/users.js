const usersRoutes = require('express').Router();
const { getMe, updateProfile } = require('../controllers/users');
const { validateUpdateProfile } = require('../middlewares/celebrate');

userRoutes.get('/me', getMe);
userRoutes.patch('/me', validateUpdateProfile, updateProfile);

module.exports = usersRoutes;
