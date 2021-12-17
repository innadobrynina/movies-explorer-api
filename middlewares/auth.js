const jwt = require('jsonwebtoken');

const AuthError = require('../errors/AuthError');
const { UNAUTHORIZED_ERROR } = require('../utils/constantsError');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const auth = req.cookies.jwt;

  if (!auth) {
    next(new AuthError(UNAUTHORIZED_ERROR));
  }
  const token = auth.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
      { expiresIn: '7d' });
  } catch (err) {
    next(new AuthError(UNAUTHORIZED_ERROR));
  }

  req.user = payload; // записываем пейлоуд в объект запроса
  next(); // пропускаем запрос дальше
};