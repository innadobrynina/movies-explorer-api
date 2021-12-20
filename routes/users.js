const router = require('express').Router();
const { getLoggedUser, patchUser } = require('../controllers/users');
const { validateUpdateProfile } = require('../middlewares/celebrate');

router.get('/me', getLoggedUser);
router.patch('/me', validateUpdateProfile, patchUser);

module.exports = router;
