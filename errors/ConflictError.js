const { conflictRequestError } = require('../utils/config');

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = conflictRequestError;
  }
}

module.exports = ConflictError;