require('dotenv').config();

const config = {};

const MONGO_OPTIONS = {
  useNewUrlParser: true,
  /*   useCreateIndex: true,
  useFindAndModify: false, */
  useUnifiedTopology: true,
};

const COOKIE_KEY = 'praktikum';

const COOKIE_OPTIONS = {
  maxAge: 3600000 * 24 * 7,
  httpOnly: true,
};

const {
  PORT = 3001,
  MONGO_URL = 'mongodb://localhost:27017/moviesdb',
  NODE_ENV,
  JWT_SECRET,
} = process.env;

const SECRET_KEY = NODE_ENV === 'production' ? JWT_SECRET : 'dev-key';
const JWT_SECRET_DEV = 'dev-key';

config.ALLOWED_CORS = [
  'http://localhost:3000',
  'http://api.indob-diploma.nomoredomains.club',
  'https://api.indob-diploma.nomoredomains.club',
  'http://indob-diploma.nomoredomains.monster',
  'https://indob-diploma.nomoredomains.monster',
  'localhost:3000'];

config.DEFAULT_ALLOWED_METHODS = 'GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS';
module.exports = {
  PORT,
  MONGO_URL,
  MONGO_OPTIONS,
  SECRET_KEY,
  COOKIE_KEY,
  COOKIE_OPTIONS,
  JWT_SECRET_DEV,
  config,
};