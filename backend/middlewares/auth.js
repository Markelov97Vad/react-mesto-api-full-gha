const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');
const { JWT_SECRET_DEV } = require('../utils/config');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthorizedError('Необхадима авторизация'));
  }
  // извлечение токена
  const token = authorization.replace('Bearer ', '');
  // верификация токена(расшифровка)
  let payload;

  try {
    // верификация токена
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : JWT_SECRET_DEV);
  } catch (err) {
    return next(new UnauthorizedError('Необхадима авторизация'));
  }
  // записываем пейлоуд в объект запроса
  req.user = payload;
  return next();
};
