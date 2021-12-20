const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const {
  REQUIRED_INPUT_ERROR,
  VALIDATION_EMAIL_ERROR,
  AUTHENTIFICATION_ERROR,
} = require('../utils/constantsError');

const userSchema = new mongoose.Schema({

  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: [true, REQUIRED_INPUT_ERROR],
  },

  email: {
    type: String,
    required: [true, REQUIRED_INPUT_ERROR],
    unique: true,
    validate: {
      validator(v) {
        return validator.isEmail(v);
      },
      message: VALIDATION_EMAIL_ERROR,
    },
  },
  password: {
    type: String,
    required: [true, REQUIRED_INPUT_ERROR],
    select: false,
    minlength: 8,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error(AUTHENTIFICATION_ERROR));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error(AUTHENTIFICATION_ERROR));
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);