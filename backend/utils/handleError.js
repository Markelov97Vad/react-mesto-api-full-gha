const { default: mongoose } = require('mongoose');

const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');

module.exports.handleError = (err, next) => {
  if (err instanceof mongoose.Error.CastError) {
    return next(new BadRequestError('Переданы некорректные данные'));
  }
  if (err instanceof mongoose.Error.ValidationError) {
    return next(new BadRequestError('Переданы некорректные данные'));
  }
  if (err.code === 11000) {
    return next(new ConflictError('При регистрации указан email, который уже существует на сервере'));
  }
  return next(err);
};
