const router = require('express').Router();
const { getMovies, createMovie, deleteMovie } = require('../controllers/movie');
const { celebrate, Joi } = require('celebrate');

router.get('/', getMovies);

router.post('/', createMovie);

router.delete('/:movieId', deleteMovie);

module.exports = router;
