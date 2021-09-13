const Movie = require('../models/movie');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const BadRequestError = require('../errors/BadRequestError');

// возвращаем все фильмы
const getMovies = (req, res, next) => {
  const ownerID = req.user._id;
  Movie.find({ owner: ownerID })
    .then((data) => res.send({ data }))
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

  Movie.create({ owner: req.user._id,
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
    nameEN, })
    .then((data) => res.send(data))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Вы не заполнили обязательные поля'));
      }
      return next(err);
    });
};

// удаляем фильм
const deleteMovie = (req, res, next) => {
  const ownerID = req.user._id;
  const { movieId } = req.params;

  Movie.findById(movieId)
    .orFail(new NotFoundError('Нет такого фильма'))
    .then((card) => {
      if (String(card.owner) !== ownerID) {
        throw new ForbiddenError('Вы не можете удалить этот фильм');
      } else {
        Movie.findByIdAndRemove(movieId)
        .then((data) => res.send({
          data,
          message: 'Информация успешно удалена',
        }))
        .catch(next);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('Некорректный запрос'));
      }
      return next(err);
    });
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};