const { serverErrorText } = require('../utils/constantsError');
const { serverError } = require('../utils/config');

module.exports = (err, req, res, next) => {
  const { statusCode = serverError, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === serverError
        ? serverErrorText
        : message,
    });
  next();
};