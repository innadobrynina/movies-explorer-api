const router = require('express').Router();
const auth = require('../middlewares/auth');
const usersRoutes = require('./users');
const moviesRoutes = require('./movies');
const enterRoute = require('./sign');
const NotFoundError = require('../errors/NotFoundError');
const { NOT_FOUND_ADDRESS_ERROR } = require('../utils/constantsError');

router.use('/', enterRoute);
router.use('/', auth);
router.use('/users', usersRoutes);
router.use('/movies', moviesRoutes);
router.use('*', (req, res, next) => next(new NotFoundError(NOT_FOUND_ADDRESS_ERROR)));

module.exports = router;