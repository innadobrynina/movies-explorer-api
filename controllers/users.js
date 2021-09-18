const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { NotFoundError } = require('../errors/NotFoundError');
const { ConflictError } = require('../errors/ConflictError');
const { BadRequestError } = require('../errors/BadRequestError');

const {
  SECRET_KEY,
  COOKIE_KEY,
  COOKIE_OPTIONS,
} = require('../utils/constants');

// создаем пользователя
const createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((encryptedPassword) => User.create({
      name, email, password: encryptedPassword,
    }))
    // eslint-disable-next-line no-unused-vars
    .then((user) => res.send({ data: user.toJSON() }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Вы не заполнили обязательные поля'));
      }
      if (err.name === 'MongoError' && err.code === 11000) {
        return next(new ConflictError('Пользователь с такой почтой уже существует'));
      }
      return next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
    // аутентификация успешна! пользователь в переменной user
      const token = jwt.sign(
        { _id: user._id },
        SECRET_KEY,
        { expiresIn: '7d' },
      );
      res
        .cookie(COOKIE_KEY, token, COOKIE_OPTIONS)
        .send({ data: user.toJSON() });
    })
    .catch(next);
};

const logout = (req, res) => res.clearCookie(COOKIE_KEY).send({ message: 'Вы вышли из аккаунта' });

const getMe = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => next(new NotFoundError('Такого пользователя нет в базе')))
    .then(({ name, email }) => res.status(200).send({ data: { email, name } }))
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('Вы прислали странный запрос'));
      }
      return next(err);
    });
};

const updateProfile = (req, res, next) => {
  const userId = req.user._id;
  const { name, email } = req.body;

  User.findByIdAndUpdate(
    userId,
    { name, email },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(() => next(new NotFoundError('Нет такого пользователя')))
    .then((data) => res.send(data))
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('Невалидный id пользователя'));
      }
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Переданы некорректные данные для обновления профиля'));
      }
      if (err.name === 'MongoError' && err.code === 11000) {
        return next(new ConflictError('Email уже существует'));
      }
      return next(err);
    });
};

module.exports = {
  createUser, login, logout, getMe, updateProfile,
};