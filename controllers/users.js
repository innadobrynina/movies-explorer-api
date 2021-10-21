const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const NotFoundError = require('../errors/NotFoundError');
const ConflictError = require('../errors/ConflictError');
const BadRequestError = require('../errors/BadRequestError');
const AuthError = require('../errors/AuthError');
const { devJwtSecret } = require('../utils/config');

const { NOT_FOUND_USER_ERROR, CONFLICT_USER_ERROR } = require('../utils/constantsError');

const handleError = (err) => {
  if (err.name === 'MongoError') {
    throw new ConflictError(CONFLICT_USER_ERROR);
  }
  if (err.name === 'ValidationError' || err.name === 'CastError') {
    throw new BadRequestError(err.message);
  }
};

const handleIdNotFound = () => {
  throw new NotFoundError(NOT_FOUND_USER_ERROR);
};

// создаем пользователя
const createUser = (req, res, next) => {
  const { name, email, password } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then(({ _id }) => User.findById(_id))
    .then((user) => res.send(user))
    .catch((err) => handleError(err))
    .catch(next);
};

const getMe = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => handleIdNotFound())
    .then((user) => res.send(user))
    .catch((err) => handleError(err))
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
    // аутентификация успешна! пользователь в переменной user
      const { NODE_ENV, JWT_SECRET } = process.env;
      const token = jwt.sign({ _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : devJwtSecret,
        { expiresIn: '7d' });
      res.send({ token });
    })
    .catch((err) => {
      throw new AuthError(err.message);
    })
    .catch(next);
};

const getProfileInfo = (req, res, next) => {
  const userId = req.user._id;
  const { email, name } = req.body;

  User.findByIdAndUpdate(userId, { email, name }, { new: true, runValidators: true })
    .orFail(() => handleIdNotFound())
    .then((user) => res.send(user))
    .catch((err) => handleError(err))
    .catch(next);
};

module.exports = {
  createUser, login, getMe, getProfileInfo,
};