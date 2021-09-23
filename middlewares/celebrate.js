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
    password: Joi.string().required(),
    name: Joi.string().required(),
  }),
});

const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .message(VALIDATION_EMAIL_ERROR)
      .messages({
        'any.required': REQUIRED_EMAIL_ERROR,
      }),
    password: Joi.string().required(),
  }),
});

const validateUpdateProfile = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .message(VALIDATION_EMAIL_ERROR)
      .messages({
        'any.required': REQUIRED_EMAIL_ERROR,
      }),
    name: Joi.string().required(),
  }),
});

const validateCreateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().integer().min(1),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().uri(),
    trailer: Joi.string().required().uri(),
    thumbnail: Joi.string().required().uri(),
    movieId: Joi.number().integer().min(1),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const validateId = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required().length(24).hex(),
  }),
});

module.exports = {
  validateCreateUser,
  validateLogin,
  validateUpdateProfile,
  validateCreateMovie,
  validateId,
};
