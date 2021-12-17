const router = require('express').Router();
const { validateCreateMovie, validateId } = require('../middlewares/celebrate');
const { getMovies, postMovie, deleteMovie } = require('../controllers/movies');

router.get('/', getMovies);

router.post('/', validateCreateMovie, postMovie);

router.delete('/:_id', validateId, deleteMovie);

module.exports = router;
