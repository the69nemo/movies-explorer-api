const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const {
  NotAuthErr,
  NotFoundErr,
  NotValidErr,
  NotRepetitionErr,
  NotRulesErr,
} = require('../errors');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.getMe = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundErr('Пользователь не найден');
      } else {
        res.send({
          name: user.name,
          email: user.email
        });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new NotValidErr('Переданны некорректные данные'));
      } else {
        next(err);
      }
    });
};

module.exports.updateUser = (req, res, next) => {
  const { name, email } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    { new: true },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundErr('Пользователь не найден');
      } else {
        res.send({
          name: user.name,
          email: user.email
        });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new NotValidErr('Переданны некорректные данные для поиска'));
      } else {
        next(err);
      }
    });
};
