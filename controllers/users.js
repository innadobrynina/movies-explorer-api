const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const NotFoundError = require('../errors/NotFoundError');
const ConflictError = require('../errors/ConflictError');
const BadRequestError = require('../errors/BadRequestError');
const AuthError = require('../errors/AuthError');

const { NOT_FOUND_USER_ERROR, CONFLICT_USER_ERROR, BAD_REQUEST_USER_ERROR } = require('../utils/constantsError');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.getLoggedUser = (req, res, next) => {
  const id = req.user._id;
  User.findById(id)
    .orFail(new Error('NotValidId'))
    .then((user) => res.send(user))
    .catch((error) => {
      if (error.message === 'NotValidId') {
        throw new NotFoundError('Пользователь по указанному _id не найден.');
      }
      if (error.name === 'CastError') {
        throw new BadRequestError('Невалидный id.');
      }
      next(error);
    })
    .catch(next);
};

// создаем пользователя
module.exports.createUser = (req, res, next) => {
  const { name, email, password } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then((user) => {
      res.send({
        name: user.name,
        email: user.email,
        id: user._id,
      });
    })
    .catch((error) => {
      if (error.name === 'ValidationError' || error.name === 'CastError') {
        throw new BadRequestError('Переданы некорректные данные при создании пользователя.');
      }
      if (error.name === 'MongoError' && error.code === 11000) {
        throw new ConflictError('Пользователь с таким email уже зарегистрирован.');
      }
      next(error);
    })
    .catch(next);
};

module.exports.patchUser = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, email }, { new: true, runValidators: true })
    .orFail(new Error('NotValidId'))
    .then((user) => res.send(user))
    .catch((error) => {
      if (error.message === 'NotValidId') {
        throw new NotFoundError(NOT_FOUND_USER_ERROR);
      }
      if (error.name === 'CastError') {
        throw new BadRequestError(BAD_REQUEST_USER_ERROR);
      }
      if (error.name === 'ValidationError') {
        throw new BadRequestError(BAD_REQUEST_USER_ERROR);
      }
      if (error.codeName === 'DuplicateKey') {
        throw new ConflictError(CONFLICT_USER_ERROR);
      }
      next(error);
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },

      );
      return res.cookie('jwt', token, { maxAge: 3600000 * 24 * 7, httpOnly: true, sameSite: false, secure: true }).send({ token });
    })
    .catch(() => {
      next(new AuthError('Неправильные почта или пароль'));
    });
};

module.exports.signOut = (req, res) => {
  res.clearCookie('jwt').send({ message: 'Пользователь вышел' });
};
