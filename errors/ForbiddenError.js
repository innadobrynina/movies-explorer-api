const { forbiddenError } = require('../utils/config');

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = forbiddenError;
  }
}

module.exports = ForbiddenError;
