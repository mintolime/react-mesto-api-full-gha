const appAuth = require('express').Router();
const { login, createUser } = require('../controllers/users');
const { validationAuthorization, validationLogin } = require('../validation/validation');

// краш-тест сервера
appAuth.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

appAuth.post('/signup', validationAuthorization, createUser);
appAuth.post('/signin', validationLogin, login);

module.exports = appAuth;
