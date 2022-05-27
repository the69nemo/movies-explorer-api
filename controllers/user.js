const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const {
  NotAuthErr,
  NotFoundErr,
  NotValidErr,
  NotRepetitionErr,
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
          email: user.email,
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
          email: user.email,
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

module.exports.createNewUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new NotRepetitionErr('Такая почта уже зарегистрирована');
      }
      return bcrypt.hash(password, 10);
    })
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then((data) => {
      res.status(200).send({
        name: data.name,
        email: data.email,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new NotValidErr('Переданны некорректные данные'));
      } else {
        next(err);
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch(() => {
      next(new NotAuthErr('Неверно указана электронная почта или пороль'));
    });
};
