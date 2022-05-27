const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { celebrate, errors, Joi } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const auth = require('./middlewares/auth');
const { createNewUser, login } = require('./controllers/user');

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

app.post('/signup', createNewUser);
app.post('/signin', login);

app.use(auth)

app.use('/users', require('./routes/user'));
app.use('/movie', require('./routes/movie'));

app.use(errorLogger);

app.use(errors());

app.use(handleError);

app.listen(PORT);
