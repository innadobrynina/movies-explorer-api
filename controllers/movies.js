const Movie = require('../models/movie');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const BadRequestError = require('../errors/BadRequestError');
const {
  BAD_REQUEST_MOVIE_ERROR,
  FORBIDDEN_MOVIE_ERROR,
} = require('../utils/constantsError');

const handleError = (err) => {
  if (err.name === 'ValidationError' || err.name === 'CastError') {
    throw new BadRequestError(err.message);
  }
};

const handleIdNotFound = () => {
  throw new NotFoundError(BAD_REQUEST_MOVIE_ERROR);
};

// возвращаем все фильмы
const getSavedMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.send(movies))
    .catch((err) => handleError(err))
    .catch(next);
};

// создание фильма
const createMovie = (req, res, next) => {
  const {
    country, director, duration, year, description, image, trailer, thumbnail, movieId, nameRU,
    nameEN,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    owner: req.user._id,
    movieId,
    nameRU,
    nameEN,
  })

    .then((movie) => res.send(movie))
    .catch((err) => handleError(err))
    .catch(next);
};

// удаляем фильм
const deleteSavedMovieById = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail(() => handleIdNotFound())
    .then((movie) => {
      if (movie.owner.toString() !== req.user._id) {
        throw new ForbiddenError(FORBIDDEN_MOVIE_ERROR);
      }
      Movie.findByIdAndRemove(req.params.movieId)
        .then((deletedMovie) => res.send(deletedMovie))
        .catch((err) => handleError(err))
        .catch(next);
    })
    .catch(next);
};

module.exports = {
  getSavedMovies,
  createMovie,
  deleteSavedMovieById,
};