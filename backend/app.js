require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const router = require('./routes');
const { PORT, DATABASE_URL } = require('./utils/config');
const { errorHendler } = require('./middlewares/errorHendler');
const { cors } = require('./middlewares/cors');
const productionJwtCheck = require('./utils/productionJwtCheck');

const app = express();

mongoose.connect(DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cross-доменные запросы
app.use(cors);
// логер запросов
app.use(requestLogger);

// проверка работы pm2
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

// все роуты
app.use(router);
// логгер ошибок
app.use(errorLogger);
// обработка ошибок celebrate
app.use(errors());
// централизированная обработка ошибок
app.use(errorHendler);
/* eslint-disable no-alert, no-console */
app.listen(PORT, () => {
  if (process.env.NODE_ENV !== 'production') {
    console.log('Код запущен в режиме разработки');
  }
  productionJwtCheck();
  console.log(`Сервер запущен, порт ${PORT}`);
});
/* eslint-enable no-alert, no-console */
