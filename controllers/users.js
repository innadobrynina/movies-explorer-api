const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { NotFoundError } = require('../errors/NotFoundError');
const { ConflictError } = require('../errors/ConflictError');
const { BadRequestError } = require('../errors/BadRequestError');
const { AuthError } = require('../errors/AuthError');

const {
  NOT_FOUND_USER_ERROR,
  BAD_REQUEST_UPDATE_USER_ERROR,
  CONFLICT_USER_ERROR,
  BAD_REQUEST_USER_ERROR,
} = require('../utils/constantsError');

const {
  SECRET_KEY,
  COOKIE_KEY,
  COOKIE_OPTIONS,
} = require('../utils/constants');

const OK = 200;

// создаем пользователя
const createUser = (req, res, next) => {
  const { name, email, password } = req.body;

  User.findOne({ email })
    .then((mail) => {
      if (mail) {
        throw new ConflictError(CONFLICT_USER_ERROR);
      } else {
        bcrypt.hash(password, 10)
          .then((hash) => User.create({
            name,
            email,
            password: hash,
          }))
        // eslint-disable-next-line no-unused-vars
          .then((user) => res.status(OK).send(user))
          .catch((err) => {
            if (err.name === 'ValidationError') {
              throw new BadRequestError(BAD_REQUEST_USER_ERROR);
            }
          })
          .catch(next);
      }
    })
    .catch(next);
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
      console.log(token);
      res
        .cookie(COOKIE_KEY, token, COOKIE_OPTIONS)
        .send({ token });
    })
    .catch(next);
};

const signout = (req, res) => res.clearCookie(COOKIE_KEY).res.send({ message: 'Вы вышли из аккаунта' });

const getMe = (req, res, next) => {
/*  User.findById(req.user._id)
    .orFail(() => next(new NotFoundError(NOT_FOUND_USER_ERROR)))
    .then(({ name, email }) => res.status(OK).send({ data: { email, name } }))
    .catch(next); */
  User.find({ _id: req.user._id })
    .then((user) => res.send({ user: user[0] }))
    .catch(next);
};

const updateProfile = (req, res, next) => {
  const userId = req.user._id;
  const { name, email } = req.body;

  User.findByIdAndUpdate(userId, { name, email }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) throw new NotFoundError(NOT_FOUND_USER_ERROR);
      // eslint-disable-next-line max-len
      if (user._id.toString() !== req.user._id) throw new BadRequestError(BAD_REQUEST_UPDATE_USER_ERROR);
      return res.send({ user });
    })
    .catch(next);
  /* .orFail(() => next(new NotFoundError(NOT_FOUND_USER_ERROR)))
    .then((data) => res.status(OK).send(data))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError(BAD_REQUEST_UPDATE_USER_ERROR));
      }
      if (err.name === 'MongoError' && err.code === 11000) {
        return next(new ConflictError(CONFLICT_USER_ERROR));
      }
      return next(err);
    }); */
};

module.exports = {
  createUser, login, signout, getMe, updateProfile,
};