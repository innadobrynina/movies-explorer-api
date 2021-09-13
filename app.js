const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('cors');
const limiter = require('./middlewares/rate-limit');
const errorHandler = require('./middlewares/errorHandler');
const router = require('./routes');

const { MONGO_URL, MONGO_OPTIONS, PORT } = require('./utils/constants');

mongoose.connect(MONGO_URL, MONGO_OPTIONS);

const app = express();
app.use(requestLogger);
app.use(limiter);
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(cors);
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(errorsHandler);
app.listen(PORT);