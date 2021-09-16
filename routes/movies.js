const moviesRoutes = require('express').Router();
const { validateCreateMovie } = require('../middlewares/celebrate');
const {  getMovie, createMovie, deleteMovie } = require('../controllers/movies');

moviesRoutes.get('/', getMovie);

moviesRoutes.post('/', validateCreateMovie, createMovie);

moviesRoutes.delete('/:movieId', deleteMovie);

module.exports = moviesRoutes;
