const Users = require('express').Router();

const {
  validationIdUser,
  validationUpdateUserInfo,
} = require('../middlewares/requestValidation');

const { getMe, updateUser } = require('../controllers/user');

Users.get('/users/me', validationIdUser, getMe);

Users.patch('/users/me', validationUpdateUserInfo, updateUser);

module.exports = Users;
