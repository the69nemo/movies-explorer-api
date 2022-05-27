const router = require('express').Router();

const {
  validationIdUser,
  validationMovieInfo,
  validationIdMovie,
} = require('../middlewares/requestValidation');

const { getMovies, createMovie, deleteMovie } = require('../controllers/movie');

router.get('/', validationIdUser, getMovies);

router.post('/', validationMovieInfo, createMovie);

router.delete('/:movieId', validationIdMovie, deleteMovie);

module.exports = router;
