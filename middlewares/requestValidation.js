const { celebrate, Joi } = require('celebrate');
const isUrl = require('validator/lib/isURL');

module.exports.validationIdUser = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().length(24).hex(),
  }),
});

module.exports.validationUserInfo = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports.validationUpdateUserInfo = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().required().email(),
  }),
});

module.exports.validationMovieInfo = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().custom((value, helpers) => {
      if (isUrl(value)) {
        return value;
      }
      return helpers.message('Поле image заполнено неверно');
    }).required(),
    trailerLink: Joi.string().custom((value, helpers) => {
      if (isUrl(value)) {
        return value;
      }
      return helpers.message('Поле trailerLink заполнено неверно');
    }).required(),
    thumbnail: Joi.string().custom((value, helpers) => {
      if (isUrl(value)) {
        return value;
      }
      return helpers.message('Поле thumbnail заполнено неверно');
    }).required(),
    owner: Joi.string().length(24).hex(),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

module.exports.validationIdMovie = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().length(24).hex(),
  }),
});

module.exports.validationLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});
