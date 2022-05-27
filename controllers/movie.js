const Movie = require('../models/movie');
const {
  NotFoundErr,
  NotValidErr,
  NotRulesErr,
} = require('../errors');

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .populate('owner')
    .then((movies) => {
      res.send(movies);
    })
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  const owner = req.user._id;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    owner,
    nameRU,
    nameEN,
  })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new NotValidErr('Переданны некорректные данные'));
      } else {
        next(err);
      }
    });
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundErr('Фильм не найден');
      } else if (String(movie.owner) === req.user._id) {
        Movie.findByIdAndRemove(req.params.movieId)
          .then(() => res.send({ message: 'Фильм успешно удален' }))
          .catch(() => next(new NotFoundErr('Фильм не найден')));
      } else {
        throw new NotRulesErr('У вас нет прав на удаление данного фильма');
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
