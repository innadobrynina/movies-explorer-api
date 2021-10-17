const jwt = require('jsonwebtoken');

const { JWT_SECRET, NODE_ENV } = process.env;
const { AuthError } = require('../errors/AuthError');
const { SECRET_KEY, COOKIE_KEY, JWT_SECRET_DEV } = require('../utils/constants');
const { UNAUTHORIZED_ERROR } = require('../utils/constantsError');

module.exports = (req, res, next) => {
  /* const auth = req.cookies[COOKIE_KEY];
  if (!auth) {
    return next(new AuthError(UNAUTHORIZED_ERROR));
  } */
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AuthError(UNAUTHORIZED_ERROR);
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : JWT_SECRET_DEV);
  } catch (err) {
    throw new AuthError(UNAUTHORIZED_ERROR);
  }

  req.user = payload; // записываем пейлоуд в объект запроса
  return next(); // пропускаем запрос дальше
};