const router = require('express').Router();
const { login, createUser, signOut } = require('../controllers/users');
const { validateCreateUser, validateLogin } = require('../middlewares/celebrate');

router.post('/signin', validateLogin, login);
router.post('/signup', validateCreateUser, createUser);
router.post('/signout', signOut);

module.exports = router;
