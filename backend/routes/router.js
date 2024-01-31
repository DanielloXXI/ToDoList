const router = require('express')
  .Router();
const cardsRouter = require('./cards');
const NotFoundError = require('../errors/NotFoundError');

router.use('/cards', cardsRouter);

router.use('/*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = router;
