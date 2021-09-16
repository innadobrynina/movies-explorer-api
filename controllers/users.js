const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const NotFoundError = require('../errors/NotFoundError'); //404
const ConflictError = require('../errors/ConflictError'); //409
const BadRequestError = require('../errors/BadRequestError'); //400
const AuthError = require('../errors/AuthError'); //401

// создаем пользователя
const createUser = (req, res, next) => {
  const {
    email, password, name,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((encryptedPassword) => {
      User.create({
        email,
        password: encryptedPassword,
        name,
      })
        // eslint-disable-next-line no-unused-vars
        .then((user) => {
          res.status(200).send({
            email,
            name,
          });
        })
        .catch((err) => {
          if (!email || !password) {
            return next(new BadRequestError('Вы не заполнили обязательные поля'));
          }
          if (err.name === 'MongoError' && err.code === 11000) {
            return next(new ConflictError('Пользователь с такой почтой уже существует'));
          }
          return next(err);
        });
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  const { NODE_ENV, JWT_SECRET = 'secret-key', JWT_DEV = 'dev-key' } = process.env;
  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new AuthError('Неправильные почта или пароль');
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new AuthError('Неправильные почта или пароль');
          }
          const token = jwt.sign(
            { _id: user._id },
            /* req.app.locals.jwtKey, */
            NODE_ENV === 'production' ? JWT_SECRET : JWT_DEV,
            { expiresIn: '7d' },
          );

          res.cookie('jwt', token, {
            maxAge: 3600000 * 24 * 7,
            httpOnly: true,
          })
            .status(201).send({
              message: 'Аутентификация прошла успешно',
            });
        });
    })
    .catch(next);
};

const logout = (req, res) =>
  res.clearCookie(COOKIE_KEY).send({ message: 'Вы вышли из аккаунта' });

const getMe = (req, res, next) => {
  User.findById(req.user._id)
  .orFail(new NotFoundError('Такого пользователя нет в базе'))
  .then((user) => res.status(200).send(user))
  .catch((err) => {
    if (err.name === 'CastError') {
      return next(new BadRequestError('Вы прислали странный запрос'));
    }
    return next(err);
  });
};

const updateProfile = (req, res, next) => {
  const { name, email } = req.body;

  const { _id = '' } = req.user;

  User.findByIdAndUpdate(
    _id,
    { name, email },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(new NotFoundError('Нет такого пользователя'))
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Вы не заполнили обязательные поля'));
      }
      return next(err);
    });
};

module.exports = {
  createUser, login, logout, getMe, updateProfile,
};