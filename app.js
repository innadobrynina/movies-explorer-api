require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { errors } = require('celebrate');
const routes = require('./routes/index');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { server } = require('./utils/config');
const limiter = require('./middlewares/rate-limit');

const { PORT = 3000 } = process.env;
const app = express();
mongoose.connect(server, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  /* useCreateIndex: true,
  useFindAndModify: false, */
});

const corsOptions = {
  origin: [
    'http://localhost:3001',
    'https://localhost:3001',
    'https://localhost:3000',
    'http://localhost:3000',
    'http://indob-diploma.nomoredomains.monster/',
    'https://indob-diploma.nomoredomains.monster/',
    'https://api.indob-diploma.nomoredomains.club/',
    'http://api.indob-diploma.nomoredomains.club/',
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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);
app.use(limiter);
app.use(helmet());

app.use(cors(corsOptions));
app.use(cookieParser());

app.use('/', routes);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);
// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`Запустился !! ${PORT}`));