const { autorizationError } = require('../utils/config');

class AuthError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = autorizationError;
  }
}

module.exports = AuthError;
