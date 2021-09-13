const router = require('express').Router();
const userRoutes = require('./users');
const movieRoutes = require('./movies');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');
const { createUser, login, logout } = require('../controllers/users');
const { validateRegistration, validateLogin } = require('../middlewares/celebrate');

router.post('/signup', validateRegistration, createUser);
router.post('/signin', validateLogin, login);
router.post('/signout', logout);
router.use(auth);
router.use('/users', userRoutes);
router.use('/movies', movieRoutes);
router.use('*', () => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
});

module.exports = router;