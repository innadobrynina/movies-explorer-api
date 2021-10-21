const jwt = require('jsonwebtoken');

const AuthError = require('../errors/AuthError');
const { devJwtSecret } = require('../utils/config');
const { UNAUTHORIZED_ERROR } = require('../utils/constantsError');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AuthError(UNAUTHORIZED_ERROR);
  }
  const token = authorization.replace('Bearer ', '');
  const { NODE_ENV, JWT_SECRET } = process.env;
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : devJwtSecret);
  } catch (err) {
    throw new AuthError(UNAUTHORIZED_ERROR);
  }

  req.user = payload; // записываем пейлоуд в объект запроса
  return next(); // пропускаем запрос дальше
};