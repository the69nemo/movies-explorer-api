const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { celebrate, errors, Joi } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const auth = require('./middlewares/auth');

const handleError = require('./middlewares/handleError');
const NotFoundErr = require('./errors/NotFoundErr');

require('dotenv').config();

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/bitfilmsdb', () => {
  // eslint-disable-next-line no-console
  console.log('**********Подключено к Базе yf **********');
});

app.use('/users', require('./routes/user'));

app.use(errorLogger);

app.use(errors());

app.use(handleError);

app.listen(PORT);
