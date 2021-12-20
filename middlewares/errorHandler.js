// const { serverErrorText } = require('../utils/constantsError');
// const { serverError } = require('../utils/config');

module.exports = (err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500
      ? 'На сервере ошибка'
      : message,
  });
  next();
};
