const router = require('express').Router();
const { getLoggedUser, getProfileInfo } = require('../controllers/users');
const { validateUpdateProfile } = require('../middlewares/celebrate');

router.get('/me', getLoggedUser);
router.patch('/me', validateUpdateProfile, getProfileInfo);

module.exports = router;
