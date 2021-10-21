const { celebrate, Joi } = require('celebrate');
const { VALIDATION_EMAIL_ERROR } = require('../utils/constantsError');
const { REQUIRED_EMAIL_ERROR } = require('../utils/constantsError');

const validateCreateUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .message(VALIDATION_EMAIL_ERROR)
      .messages({
        'any.required': REQUIRED_EMAIL_ERROR,
      }),
    password: Joi.string().required().min(8),
    name: Joi.string().required().min(2).max(30),
  }),
});

const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .message(VALIDATION_EMAIL_ERROR)
      .messages({
        'any.required': REQUIRED_EMAIL_ERROR,
      }),
    password: Joi.string().required().min(8),
  }),
});

const validateUpdateProfile = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .message(VALIDATION_EMAIL_ERROR)
      .messages({
        'any.required': REQUIRED_EMAIL_ERROR,
      }),
    name: Joi.string().required().min(2).max(30),
  }),
});

const validateCreateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().uri().required(),
    trailer: Joi.string().uri().required(),
    thumbnail: Joi.string().uri().required(),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const validateId = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().hex().length(24),
  }).unknown(true),
});

module.exports = {
  validateCreateUser,
  validateLogin,
  validateUpdateProfile,
  validateCreateMovie,
  validateId,
};
