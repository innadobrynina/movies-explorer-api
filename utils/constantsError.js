const NOT_FOUND_MOVIE_ERROR = 'Фильм по указанному id не найден';
const NOT_FOUND_USER_ERROR = 'Пользователь по указанному id не найден';
const NOT_FOUND_ADDRESS_ERROR = 'Запрашиваемый адрес не найден';
const BAD_REQUEST_MOVIE_ERROR = 'Переданы некорректные данные при создании фильма';
const BAD_REQUEST_USER_ERROR = 'Переданы некорректные данные при создании пользователя';
const BAD_REQUEST_UPDATE_USER_ERROR = 'Переданы некорректные данные при обновлении профиля';
const FORBIDDEN_MOVIE_ERROR = 'Отсутствуют права на удаление фильма';
const CONFLICT_MOVIE_ERROR = 'Такой фильм уже существует';
const CONFLICT_USER_ERROR = 'Пользователь с таким email уже существует';
const UNAUTHORIZED_ERROR = 'Необходима авторизация';
const AUTHENTIFICATION_ERROR = 'Неверный email или пароль';
const VALIDATION_DATA_ERROR = 'Переданы некорректные данные';
const SERVER_ERROR = 'На сервере произошла ошибка';
const REQUIRED_INPUT_ERROR = 'Поле не может быть пустым';
const VALIDATION_LINK_ERROR = 'Некорректный формат ccылки';
const VALIDATION_EMAIL_ERROR = 'Некорректный формат email';
const REMOVE_MOVIE_OK = 'Фильм удален';
const REQUIRED_EMAIL_ERROR = 'Поле email обязательное';
const serverErrorText = 'На сервере произошла ошибка';

module.exports = {
  NOT_FOUND_MOVIE_ERROR,
  NOT_FOUND_USER_ERROR,
  NOT_FOUND_ADDRESS_ERROR,
  BAD_REQUEST_MOVIE_ERROR,
  BAD_REQUEST_USER_ERROR,
  BAD_REQUEST_UPDATE_USER_ERROR,
  FORBIDDEN_MOVIE_ERROR,
  CONFLICT_MOVIE_ERROR,
  CONFLICT_USER_ERROR,
  UNAUTHORIZED_ERROR,
  AUTHENTIFICATION_ERROR,
  VALIDATION_DATA_ERROR,
  SERVER_ERROR,
  REQUIRED_INPUT_ERROR,
  VALIDATION_LINK_ERROR,
  VALIDATION_EMAIL_ERROR,
  REMOVE_MOVIE_OK,
  REQUIRED_EMAIL_ERROR,
  serverErrorText,
};