const cardSchema = require('../models/card');
const InaccurateDataError = require('../errors/InaccurateDataError');
const NotFoundError = require('../errors/NotFoundError');

const getCards = (request, response, next) => {
  cardSchema
    .find({})
    .then((cards) => response.send(cards))
    .catch(next);
};

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  cardSchema.findById(cardId)
    .then((card) => {
      if (!card) { throw new NotFoundError('Нет карточки с таким id'); }
      return card.deleteOne()
        .then((cardData) => {
          res.send(cardData);
        });
    })
    .catch(next);
};

function createCard(req, res, next) {
  const { text, description, status } = req.body;

  cardSchema
    .create({ text, description, status })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new InaccurateDataError('Переданы некорректные данные при создании карточки'));
      } else {
        next(err);
      }
    });
}

const updateCard = (request, response, next) => {
  const { text, description, status } = request.body;

  cardSchema
    .findByIdAndUpdate(
      request.params.cardId,
      {
        text,
        description,
        status,
      },
      {
        new: true,
        runValidators: true,
      },
    )
    .orFail()
    .then((card) => response.status(200)
      .send(card))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        next(new NotFoundError('Карта с таким id - отсутствует'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  createCard,
  deleteCard,
  getCards,
  updateCard,
};
