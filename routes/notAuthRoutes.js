const NotAuthRoutes = require('express').Router();

const {
  validationUserInfo,
  validationLogin,
} = require('../middlewares/requestValidation');
const { createNewUser, login } = require('../controllers/user');

NotAuthRoutes.post('/signup', validationUserInfo, createNewUser);
NotAuthRoutes.post('/signin', validationLogin, login);

module.exports = NotAuthRoutes;
