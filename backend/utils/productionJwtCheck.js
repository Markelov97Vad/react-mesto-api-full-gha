const jwt = require('jsonwebtoken');

const { JWT_SECRET_DEV, ID_DEV } = require('./config');

const { JWT_SECRET, NODE_ENV } = process.env;

function productionJwtCheck() {
  // создание токена для проверки, в режиме продакшена или разработки
  const token = jwt.sign(
    { _id: ID_DEV },
    NODE_ENV === 'production' ? JWT_SECRET : JWT_SECRET_DEV,
    { expiresIn: 10 },
  );
  // проверка секретного ключа
  /* eslint-disable no-alert, no-console */
  try {
    jwt.verify(token, JWT_SECRET_DEV);

    console.log('\x1b[31m%s\x1b[0m', `
      Надо исправить. В продакшне используется тот же
      секретный ключ, что и в режиме разработки.
    `);
  } catch (err) {
    if (err.name === 'JsonWebTokenError' && err.message === 'invalid signature') {
      console.log(
        '\x1b[32m%s\x1b[0m',
        'Всё в порядке. Секретные ключи отличаются',
      );
    } else {
      console.log(
        '\x1b[33m%s\x1b[0m',
        'Что-то не так',
        err,
      );
    }
  }
  /* eslint-enable no-alert, no-console */
}

module.exports = productionJwtCheck;
