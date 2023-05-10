const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const {
  OK_CODE, CREATED_CODE,
} = require('../utils/codeStatus');
const NotFoundError = require('../errors/NotFoundError');
const { JWT_SECRET_DEV } = require('../utils/config');
const { handleError } = require('../utils/handleError');

const { NODE_ENV, JWT_SECRET } = process.env;

// декоратор для поиска пользователя по id
function findUserById(model, id, res, next) {
  return model.findById(id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь по указанному Id не найден.');
      }
      return res.status(OK_CODE).send(user);
    })
    .catch((err) => handleError(err, next));
}

// декоратор для поиска по id и обновления данных
function findUserByIdAndUpdate(model, id, params, res, next) {
  return model
    .findByIdAndUpdate(id, params, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь с указанным id не найден.');
      }
      return res.status(OK_CODE).send(user);
    })
    .catch((err) => handleError(err, next));
}

// авторизация
const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentails(email, password)
    .then((user) => {
      // создаем токен
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : JWT_SECRET_DEV,
        { expiresIn: '7d' },
      );
      return res.send({ token });
    })
    .catch(next);
};

// запрос всех пользователей
const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(OK_CODE).send(users))
    .catch(next);
};

// запрос пользователя по ID
const getUserById = (req, res, next) => {
  const { userId } = req.params;
  return findUserById(User, userId, res, next);
};

// запрос текущего пользователя
const getCurrentUser = (req, res, next) => {
  const { _id } = req.user;
  return findUserById(User, _id, res, next);
};

// отправка данных о новом пользователе
const createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;

  return bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => {
      const newUser = user.toObject();
      delete newUser.password;
      res.status(CREATED_CODE).send(newUser);
    })
    .catch((err) => handleError(err, next));
};

// обновление данных пользователя
const setUserInfo = (req, res, next) => {
  const { _id } = req.user;
  const { name, about } = req.body;
  return findUserByIdAndUpdate(User, _id, { name, about }, res, next);
};

// обновление аватара пользователя
const setAvatar = (req, res, next) => {
  const { _id } = req.user;
  const { avatar } = req.body;
  return findUserByIdAndUpdate(User, _id, { avatar }, res, next);
};

module.exports = {
  login,
  getUsers,
  getUserById,
  getCurrentUser,
  createUser,
  setUserInfo,
  setAvatar,
};
