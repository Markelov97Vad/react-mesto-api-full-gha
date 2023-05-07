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

/* eslint-disable no-alert, no-console */
mongoose.connect(DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('База данных подключена');
}).catch((err) => {
  console.log('\x1b[31m%s\x1b[0m', 'Ошибка в подключении БД');
  console.error(err);
});
/* eslint-enable no-alert, no-console */
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
    console.log('\x1b[33m%s\x1b[0m', 'Код запущен в режиме разработки');
  }
  productionJwtCheck();
  console.log(`Сервер запущен, порт ${PORT}`);
});
/* eslint-enable no-alert, no-console */
