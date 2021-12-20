const { requestError } = require('../utils/config');

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = requestError;
  }
}

module.exports = BadRequestError;
