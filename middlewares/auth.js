const jwt = require('jsonwebtoken');
const { AuthError } = require('../errors/AuthError');
const { SECRET_KEY, COOKIE_KEY } = require('../utils/constants');
const { UNAUTHORIZED_ERROR } = require('../utils/constantsError');

module.exports = (req, res, next) => {
  const auth = req.cookies[COOKIE_KEY];
  if (!auth) {
    return next(new AuthError(UNAUTHORIZED_ERROR));
  }
  try {
    const payload = jwt.verify(auth, SECRET_KEY);
    req.user = payload; // записываем пейлоуд в объект запроса
  } catch (err) {
    return next(new AuthError(UNAUTHORIZED_ERROR));
  }

  return next(); // пропускаем запрос дальше
};