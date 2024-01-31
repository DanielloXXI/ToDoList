const cardRoutes = require('express')
  .Router();
const { cardBodyValidator, cardIdParamsValidator, cardUpdateValidator } = require('../utils/requestValidators');

const {
  getCards,
  deleteCard,
  createCard,
  updateCard,
} = require('../controllers/cards');

cardRoutes.get('/', getCards);
cardRoutes.delete('/:cardId', cardIdParamsValidator, deleteCard);
cardRoutes.post('/', cardBodyValidator, createCard);
cardRoutes.patch('/:cardId', cardUpdateValidator, updateCard);

module.exports = cardRoutes;
