const { Joi, celebrate } = require('celebrate');

module.exports.cardBodyValidator = celebrate({
  body: Joi.object().keys({
    text: Joi.string().required().min(1)
      .max(60),
    description: Joi.string().allow(null).max(300),
    status: Joi.string().required(),
  }),
});

module.exports.cardIdParamsValidator = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().hex().length(24),
  }),
});

module.exports.cardUpdateValidator = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().hex().length(24),
  }),
  body: Joi.object().keys({
    text: Joi.string().required().min(1)
      .max(60),
    description: Joi.string().allow('').allow(null).max(300)
      .min(0),
    status: Joi.string().required(),
  }),
});
