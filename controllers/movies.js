const Movie = require('../models/movie');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const BadRequestError = require('../errors/BadRequestError');
const {
  BAD_REQUEST_MOVIE_ERROR,
  FORBIDDEN_MOVIE_ERROR,
  NOT_FOUND_MOVIE_ERROR,
  VALIDATION_DATA_ERROR,
} = require('../utils/constantsError');

// возвращаем все фильмы
module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.send(movies))
    .catch(next);
};

// создание фильма
module.exports.postMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  const owner = req.user._id;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner,
  })
    .then((movie) => res.send(movie))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        throw new BadRequestError(VALIDATION_DATA_ERROR);
      }
      next(error);
    })
    .catch(next);
};

// удаляем фильм
module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params._id)
    .orFail(new Error('NotValidId'))
    .then((movie) => {
      const movieUserId = movie.owner.toString();
      const UserId = req.user._id;
      if (movieUserId !== UserId) {
        throw new ForbiddenError(FORBIDDEN_MOVIE_ERROR);
      }
      return movie.remove()
        .then(() => res.send({ message: 'Фильм удален' }));
    })
    .catch((error) => {
      if (error.message === 'NotValidId') {
        throw new NotFoundError(NOT_FOUND_MOVIE_ERROR);
      }
      if (error.name === 'CastError') {
        throw new BadRequestError(BAD_REQUEST_MOVIE_ERROR);
      }
      next(error);
    })
    .catch(next);
};
