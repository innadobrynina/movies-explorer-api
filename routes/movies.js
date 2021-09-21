const moviesRoutes = require('express').Router();
const { validateCreateMovie, validateId } = require('../middlewares/celebrate');
const { getMovie, createMovie, deleteMovie } = require('../controllers/movies');

moviesRoutes.get('/', getMovie);

moviesRoutes.post('/', validateCreateMovie, createMovie);

moviesRoutes.delete('/:movieId', validateId, deleteMovie);

module.exports = { moviesRoutes };
