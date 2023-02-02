const EMOJI = [
  'smile',
  'sleeping',
  'puke',
  'angry'
];

const FilterType = {
  ALL: 'all',
  WATCHLIST: 'watchlist',
  HISTORY: 'history',
  FAVORITE: 'favorites',
};

const FilterDictionary = {
  all: 'All Movies',
  watchlist: 'Watchlist',
  history: 'History',
  favorite: 'Favorite',
};

const SortType = {
  DEFAULT: 'default',
  DATE: 'date',
  RATING: 'rating',
};

const UserAction = {
  UPDATE_FILM: 'UPDATE_FILM',
  ADD_COMMENT: 'ADD_COMMENT',
  DELETE_COMMENT: 'DELETE_COMMENT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
  INIT_ERROR: 'INIT_ERROR'
};

const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE'
};

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

const UserRatings = {
  NOVICE: {
    rating: 'Novice',
    max: 10,
  },
  FAN: {
    rating: 'Fan',
    max: 20,
  },
  MOVIE_BUFF: {
    rating: 'Movie buff',
    max: Infinity,
  }
};

const FILM_COUNT_PER_STEP = 5;
const TEXT_LIMIT = 140;
const AUTHORIZATION = 'Basic kTy9gI98jhz2327rD';
const END_POINT = 'https://19.ecmascript.pages.academy/cinemaddict';
const SHAKE_ANIMATION_TIMEOUT = 600;
const SHAKE_CLASS_NAME = 'shake';


export {
  EMOJI,
  END_POINT,
  TEXT_LIMIT,
  AUTHORIZATION,
  FILM_COUNT_PER_STEP,
  SHAKE_ANIMATION_TIMEOUT,
  SHAKE_CLASS_NAME,
  Method,
  SortType,
  TimeLimit,
  UserAction,
  UpdateType,
  FilterType,
  UserRatings,
  FilterDictionary,
};
