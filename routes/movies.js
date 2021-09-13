const moviesRoutes = require('express').Router();
const { validateMovie } = require('../middlewares/celebrate');
const {  getMovie, createMovie, deleteMovie } = require('../controllers/movies');

moviesRoutes.get('/', getMovie);

moviesRoutes.post('/movies', validateMovie, createMovie);

moviesRoutes.delete('/:movieId', deleteMovie);

module.exports = moviesRoutes;
