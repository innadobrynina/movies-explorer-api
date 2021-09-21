const router = require('express').Router();
const auth = require('../middlewares/auth');
const { usersRoutes } = require('./users');
const { moviesRoutes } = require('./movies');
const { login, createUser, logout } = require('../controllers/users');
const { NotFoundError } = require('../errors/NotFoundError');
const { validateCreateUser, validateLogin } = require('../middlewares/celebrate');
const { NOT_FOUND_ADDRESS_ERROR } = require('../utils/constantsError');

router.post('/signup', validateCreateUser, createUser);
router.post('/signin', validateLogin, login);
router.post('/signout', logout);
router.use(auth);
router.use('/users', usersRoutes);
router.use('/movies', moviesRoutes);
router.use('*', () => {
  throw new NotFoundError(NOT_FOUND_ADDRESS_ERROR);
});

module.exports = router;