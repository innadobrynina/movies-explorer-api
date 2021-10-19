const helmet = require('helmet');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const limiter = require('./middlewares/rate-limit');
const errorHandler = require('./middlewares/errorHandler');
const router = require('./routes');

const {
  MONGO_URL, MONGO_OPTIONS, PORT, ALLOWED_CORS,
} = require('./utils/constants');

mongoose.connect(MONGO_URL, MONGO_OPTIONS);

const app = express();
app.use(requestLogger);
app.use(limiter);
app.use(express.json());
app.use(cookieParser());
app.use(helmet());

/* app.use(
  cors({
    origin: (origin, callback) => {
      // allow requests with no origin
      // (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (ALLOWED_CORS.includes(origin)) return callback(null, true);
      return callback(new Error('Ошибка CORS'), true);
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,
  }),
); */

const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://api.indob-diploma.nomoredomains.club',
    'https://api.indob-diploma.nomoredomains.club',
    'http://indob-diploma.nomoredomains.monster',
    'https://indob-diploma.nomoredomains.monster',
    'https://api.nomoreparties.co/beatfilm-movies',
    'localhost:3000'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type, Authorization',
  /* credentials: true, */
};

app.use(cors(corsOptions));
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);
// eslint-disable-next-line no-console
app.listen(PORT, () => console.log('Запустился!!'));