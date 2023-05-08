const { default: mongoose } = require('mongoose');

const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const Card = require('../models/card');
const {
  OK_CODE, CREATED_CODE,
} = require('../utils/codeStatus');

// запрос всех карточек
const getCards = (req, res, next) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => {
      res.status(OK_CODE).send(cards);
    })
    .catch(next);
};

// отправка данных о новой карточке
async function createCard(req, res, next) {
  try {
    const { name, link } = req.body;
    const owner = req.user._id;

    const newCard = await Card.create({ name, link, owner });
    await newCard.populate(['owner', 'likes']);
    return res.status(CREATED_CODE).send(newCard);
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      return next(new BadRequestError('Переданы некорректные данные при создании карточки.'));
    }
    return next(err);
  }
}

// запрос на удаление карточки
const deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  const { _id } = req.user;
  Card.findById(cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError(`Карточка с указанным id: ${cardId} не найдена.`);
      }
      if (card.owner.valueOf() !== _id) {
        throw new ForbiddenError('Попытка удалить чужую карточку');
      }
      return card.deleteOne();
    })
    .then(() => res.status(OK_CODE).send({ message: `Карточка с id: ${cardId} была удалена` }))
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        return next(new BadRequestError(`Указан некорректный id: ${cardId}`));
      }
      return next(err);
    });
};

// запрос на добавление пользователя в объект likes выбранной карточки
async function likeCard(req, res, next) {
  try {
    const { cardId } = req.params;
    const { _id } = req.user;

    const card = await Card.findByIdAndUpdate(
      cardId,
      { $addToSet: { likes: _id } }, // добавить _id в массив, если его там нет
      { new: true },
    ).populate(['owner', 'likes']);

    if (!card) {
      throw new NotFoundError(`Передан несуществующий id: ${cardId} карточки.`);
    }

    return res.status(OK_CODE).send(card);
  } catch (err) {
    if (err instanceof mongoose.Error.CastError) {
      return next(new BadRequestError('Переданы некорректные данные для постановки лайка'));
    }
    return next(err);
  }
}

// запрос на удаление пользователя из объекта likes выбранной карточки
async function dislikeCard(req, res, next) {
  try {
    const userId = req.user._id;
    const { cardId } = req.params;

    const card = await Card.findByIdAndUpdate(
      cardId,
      { $pull: { likes: userId } }, // убрать _id из массива, если он есть
      { new: true },
    ).populate(['owner', 'likes']);

    if (!card) {
      throw new NotFoundError(`Передан несуществующий id: ${cardId} карточки.`);
    }
    return res.status(OK_CODE).send(card);
  } catch (err) {
    if (err.name === 'CastError' || err.name === 'ValidationError') {
      return next(new BadRequestError('Переданы некорректные данные для снятии лайка'));
    }
    return next(err);
  }
}

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
