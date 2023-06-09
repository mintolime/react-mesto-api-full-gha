const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const UnauthorizedError = require('../utils/errors/UnauthorizedError');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Minion',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'ASAP? yes,sir!',
  },
  avatar: {
    type: String,
    default: 'https://media.tenor.com/-Y2YOay3_JoAAAAM/its-friday-dancing.gif',
    validate: {
      validator: (value) => validator.isURL(value),
      message: 'Неправильный формат URL',
    },
  },
  email: {
    type: String,
    required: [true, 'Данное поле обязательно к заполнению'],
    unique: true,
    validate: {
      validator: (value) => validator.isEmail(value),
      message: 'Неправильный формат почты',
    },
  },
  password: {
    type: String,
    required: [true, 'Данное поле обязательно к заполнению'],
    select: false,
  },
}, { versionKey: false }); // для скрытия версий в момент создания
// done
userSchema.statics.findUserByCredentials = function _(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError('Неправильные почта или пароль');
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new UnauthorizedError('Неправильные почта или пароль');
          }
          return user;
        });
    });
};
module.exports = mongoose.model('user', userSchema);
