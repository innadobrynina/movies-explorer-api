const { notFoundError } = require('../utils/config');

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = notFoundError;
  }
}

module.exports = NotFoundError;
