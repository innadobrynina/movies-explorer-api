const Movie = require('../models/movie');
const { NotFoundError } = require('../errors/NotFoundError');
const { ForbiddenError } = require('../errors/ForbiddenError');
const { BadRequestError } = require('../errors/BadRequestError');
const { ConflictError } = require('../errors/ConflictError');
const {
  BAD_REQUEST_MOVIE_ERROR,
  NOT_FOUND_MOVIE_ERROR,
  FORBIDDEN_MOVIE_ERROR,
  REMOVE_MOVIE_OK,
  CONFLICT_MOVIE_ERROR,
} = require('../utils/constantsError');

const OK = 200;

// возвращаем все фильмы
const getMovie = (req, res, next) => {
  const ownerID = req.user._id;
  Movie.find({ owner: ownerID })
    .then((data) => res.status(OK).send({ data }))
    .catch(next);
};

// создание фильма
const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  Movie.create({
    owner: req.user._id,
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  })
    .then((data) => res.status(OK).send(data))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError(BAD_REQUEST_MOVIE_ERROR);
      } else if (err.code === 11000) {
        throw new ConflictError(CONFLICT_MOVIE_ERROR);
      }
    })
    .catch(next);
};

// удаляем фильм
const deleteMovie = (req, res, next) => {
  const ownerID = req.user._id;
  const { movieId } = req.params;

  Movie.findById(movieId)
    .orFail(() => next(new NotFoundError(NOT_FOUND_MOVIE_ERROR)))
    .then((card) => {
      if (card.owner.toString() === ownerID) {
        Movie.findByIdAndDelete(movieId)
          .then(() => res.status(OK).send({ message: REMOVE_MOVIE_OK }))
          .catch(next);
      } else {
        throw new ForbiddenError(FORBIDDEN_MOVIE_ERROR);
      }
    })
    .catch(next);
};

module.exports = {
  getMovie,
  createMovie,
  deleteMovie,
};