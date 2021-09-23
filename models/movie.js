const mongoose = require('mongoose');
const validator = require('validator');
const {
  REQUIRED_INPUT_ERROR,
  VALIDATION_LINK_ERROR,
} = require('../utils/constantsError');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, REQUIRED_INPUT_ERROR],
  },

  director: {
    type: String,
    required: [true, REQUIRED_INPUT_ERROR],
  },

  duration: {
    type: Number,
    required: [true, REQUIRED_INPUT_ERROR],
  },

  year: {
    type: String,
    required: [true, REQUIRED_INPUT_ERROR],
  },

  description: {
    type: String,
    required: [true, REQUIRED_INPUT_ERROR],
  },

  image: {
    type: String,
    required: [true, REQUIRED_INPUT_ERROR],
    validate: {
      validator(v) {
        return validator.isURL(v);
      },
      message: VALIDATION_LINK_ERROR,
    },
  },
  trailer: {
    type: String,
    required: [true, REQUIRED_INPUT_ERROR],
    validate: {
      validator(v) {
        return validator.isURL(v);
      },
      message: VALIDATION_LINK_ERROR,
    },
  },

  thumbnail: {
    type: String,
    required: [true, REQUIRED_INPUT_ERROR],
    validate: {
      validator(v) {
        return validator.isURL(v);
      },
      message: VALIDATION_LINK_ERROR,
    },
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, REQUIRED_INPUT_ERROR],
  },

  movieId: {
    type: Number,
    required: [true, REQUIRED_INPUT_ERROR],
  },

  nameRU: {
    type: String,
    required: [true, REQUIRED_INPUT_ERROR],
  },

  nameEN: {
    type: String,
    required: [true, REQUIRED_INPUT_ERROR],
  },
});

module.exports = mongoose.model('movie', movieSchema);