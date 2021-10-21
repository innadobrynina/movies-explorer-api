const moviesRoutes = require('express').Router();
const { validateCreateMovie, validateId } = require('../middlewares/celebrate');
const { getSavedMovies, createMovie, deleteSavedMovieById } = require('../controllers/movies');

moviesRoutes.get('/', getSavedMovies);

moviesRoutes.post('/', validateCreateMovie, createMovie);

moviesRoutes.delete('/:movieId', validateId, deleteSavedMovieById);

module.exports = moviesRoutes;
