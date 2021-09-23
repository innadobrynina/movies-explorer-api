const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const {
  REQUIRED_INPUT_ERROR,
  VALIDATION_EMAIL_ERROR,
  AUTHENTIFICATION_ERROR,
} = require('../utils/constantsError');

const { AuthError } = require('../errors/AuthError');

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
        throw new AuthError(AUTHENTIFICATION_ERROR);
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new AuthError(AUTHENTIFICATION_ERROR);
          }

          return user;
        });
    });
};

// eslint-disable-next-line func-names
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

module.exports = mongoose.model('user', userSchema);