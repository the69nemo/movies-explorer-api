const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
require('dotenv').config();
const { requestLogger, errorLogger } = require('./middlewares/logger');
const routes = require('./routes');
const handleError = require('./middlewares/handleError');

const { PORT, DB_URL } = require('./config');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(DB_URL);

app.use(requestLogger);

app.use(cors());

app.use(routes);

app.use(errorLogger);

app.use(errors());

app.use(handleError);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`*****Подключено к порту: ${PORT}**********`);
});
