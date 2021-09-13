const jwt = require('jsonwebtoken');
const AuthError = require('../errors/AuthError');
const NotFoundError = require('../errors/NotFoundError');

module.exports = (req, res, next) => {
  const auth = req.headers.cookie;
  if (!auth) {
    throw new AuthError('Необходима авторизация');
  }
  const token = auth.replace('jwt=', '');
  let payload;

  try {
    const { NODE_ENV, JWT_SECRET } = process.env;
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    throw new NotFoundError('Необходима авторизация');
  }
  req.user = payload;
  next();
};