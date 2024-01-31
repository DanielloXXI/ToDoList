const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, 'Поле "text" должно быть заполнено'],
    minlength: [1, 'Минимальная длина поля "text" - 1'],
    maxlength: [60, 'Максимальная длина поля "text" - 60'],
  },
  description: {
    type: String || null,
    maxlength: [300, 'Максимальная длина поля "description" - 300'],
  },
  status: {
    type: String,
    required: [true, 'Поле "status" должно быть заполнено'],
    validate: {
      validator: (str) => str === 'В процессе' || str === 'Ожидает выполнения' || str === 'Выполнено',
      message: '400 Неверно указан status.',
    },
  },
  __v: { type: Number, select: false },
});

module.exports = mongoose.model('card', cardSchema);
