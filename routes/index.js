const router = require('express').Router();
const auth = require('../middlewares/auth');
const usersRoutes = require('./users');
const moviesRoutes = require('./movies');
const { login, createUser } = require('../controllers/users');
const NotFoundError = require('../errors/NotFoundError');
const { validateCreateUser, validateLogin } = require('../middlewares/celebrate');
const NOT_FOUND_ADDRESS_ERROR = require('../utils/constantsError');

router.post('/signup', validateCreateUser, createUser);
router.post('/signin', validateLogin, login);
// router.post('/signout', signout);
// router.use(auth);
router.use('/users', auth, usersRoutes);
router.use('/movies', auth, moviesRoutes);
router.use((req, res, next) => {
  next(new NotFoundError(NOT_FOUND_ADDRESS_ERROR));
});

module.exports = router;