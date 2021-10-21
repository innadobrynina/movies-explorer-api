require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');

const { errors } = require('celebrate');
const router = require('./routes/index');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const { limiter } = require('./middlewares/rate-limit');
const { errorHandler } = require('./middlewares/errorHandler');

const { PORT = 3000, DB_PATH = 'mongodb://localhost:27017/bitfilmsdb' } = process.env;
const app = express();
mongoose.connect(`${DB_PATH}`, {
  useNewUrlParser: true,
  /* useCreateIndex: true,
  useFindAndModify: false, */
});

const corsOptions = {
  origin: [
    'http://localhost:3001',
    'http://localhost:3000',
    'http://api.indob-diploma.nomoredomains.club',
    'https://api.indob-diploma.nomoredomains.club',
    'http://indob-diploma.nomoredomains.monster',
    'https://indob-diploma.nomoredomains.monster',
    'localhost:3000',
    'localhost:3001',
    'https://62.84.113.159',
    'http://62.84.113.159',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization', 'authorization'],
  credentials: true,
};

app.use('*', cors(corsOptions));
app.use(helmet());
app.use(express.json());
app.use(requestLogger);
app.use(limiter);
app.use('/', router);

// app.use(cookieParser());

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);
// eslint-disable-next-line no-console
app.listen(PORT, () => console.log('Запустился!!'));