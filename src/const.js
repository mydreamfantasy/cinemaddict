const EMOJI = [
  'smile',
  'sleeping',
  'puke',
  'angry'
];

const NoFilms = {
  ALL_FILMS: 'There are no movies in our database',
  WATCHLIST: 'There are no movies to watch now',
  HISTORY: 'There are no watched movies now',
  FAVORITE:'There are no favorite movies now',
};

const TitlesSection = {
  LOADING: 'Loading...',
  ALL_MOVIES: 'All movies. Upcoming',
  TOP_RATED: 'Top rated',
  MOST_COMMENTED: 'Most commented'
};

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
    min: 1,
    max: 10,
  },
  FAN: {
    rating: 'Fan',
    min: 11,
    max: 20,
  },
  MOVIE_BUFF: {
    rating: 'Movie buff',
    min: 21,
    max: null,
  }
};

const FILM_COUNT_PER_STEP = 5;
const TEXT_LIMIT = 140;
const AUTHORIZATION = 'Basic kTy9gI989dsz2327rD';
const END_POINT = 'https://19.ecmascript.pages.academy/cinemaddict';


export {
  EMOJI,
  NoFilms,
  FilterDictionary,
  FILM_COUNT_PER_STEP,
  FilterType,
  SortType,
  TitlesSection,
  UserAction,
  UpdateType,
  TEXT_LIMIT,
  Method,
  AUTHORIZATION,
  END_POINT,
  TimeLimit,
  UserRatings
};
