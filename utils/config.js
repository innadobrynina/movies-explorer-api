const server = 'mongodb://localhost:27017/movies-explorer';
module.exports.requestError = 400;
module.exports.notFoundError = 404;
module.exports.serverError = 500;
module.exports.autorizationError = 401;
module.exports.forbiddenError = 403;
module.exports.conflictRequestError = 409;
module.exports = {
  server,
};

module.exports.corsOptions = {
  origin: [
    'http://indob-diploma.nomoredomains.monster',
    'https://indob-diploma.nomoredomains.monster',
    'http://localhost:3001',
    'https://localhost:3001',
    'https://localhost:3000',
    'http://localhost:3000',
    'localhost:3000',
    'localhost:3001',
    'https://62.84.113.159',
    'http://62.84.113.159',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization', 'Access-Control-Allow-Credentials'],
  credentials: true,
};