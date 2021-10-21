const {
  VALIDATION_DATA_ERROR,
  SERVER_ERROR,
} = require('../utils/constantsError');

module.exports.errorHandler = (err, req, res, next) => {
  const { statusCode = 500, message } = err;
  if (err.kind === 'ObjectId') {
    res.status(400).send({
      message: VALIDATION_DATA_ERROR,
    });
  } else {
    res.status(statusCode).send({
      message: statusCode === 500 ? SERVER_ERROR : message,
    });
  }

  next();
};
