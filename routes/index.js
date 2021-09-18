const router = require('express').Router();
const auth = require('../middlewares/auth');
const { usersRoutes } = require('./users');
const { moviesRoutes } = require('./movies');
const { login, createUser, logout } = require('../controllers/users');
const { NotFoundError } = require('../errors/NotFoundError');
const { validateCreateUser, validateLogin } = require('../middlewares/celebrate');

router.post('/signup', validateCreateUser, createUser);
router.post('/signin', validateLogin, login);
router.post('/signout', logout);
router.use(auth);
router.use('/users', usersRoutes);
router.use('/movies', moviesRoutes);
router.get('*', () => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
});

module.exports = router;