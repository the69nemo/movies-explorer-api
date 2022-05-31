const Movies = require('express').Router();

const {
  validationIdUser,
  validationMovieInfo,
  validationIdMovie,
} = require('../middlewares/requestValidation');

const { getMovies, createMovie, deleteMovie } = require('../controllers/movie');

Movies.get('/movies', validationIdUser, getMovies);

Movies.post('/movies', validationMovieInfo, createMovie);

Movies.delete('/movies/:movieId', validationIdMovie, deleteMovie);

module.exports = Movies;
