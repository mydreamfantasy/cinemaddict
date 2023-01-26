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
  UPDATE_COMMENT: 'UPDATE_FILM',
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


const MIN_RATING = 2.0;
const MAX_RATING = 10.0;
const MIN_YEAR = 1900;
const MAX_YEAR = 1999;
const MIN_COMMENTS = 0;
const MAX_COMMENTS = 10;
const MIN_DURATION = 30;
const MAX_DURATION = 230;
const DATE_FORMAT = 'DD/MM/YYYY hh:mm';
const DATE_FORMAT_FILM = 'DD MMMM YYYY';
const COMMENT_COUNT = 7;
const FILM_COUNT = 30;
const FILM_COUNT_PER_STEP = 5;
const MIN_COUNT = 30;
const MAX_COUNT = 100000;
const TOP_RATED_COUNT = 2;
const TOP_COMMENT_COUNT = 2;
const TEXT_LIMIT = 140;
const TEXT_SIZE = 139;

const AUTHORIZATION = 'Basic kTy9gIdsz2317rD';
const END_POINT = 'https://19.ecmascript.pages.academy/cinemaddict';


export {
  EMOJI,
  NoFilms,
  FilterDictionary,
  MIN_RATING,
  MAX_RATING,
  MIN_YEAR,
  MAX_YEAR,
  MIN_COMMENTS,
  MAX_COMMENTS,
  MIN_DURATION,
  MAX_DURATION,
  DATE_FORMAT,
  DATE_FORMAT_FILM,
  COMMENT_COUNT,
  FILM_COUNT,
  FILM_COUNT_PER_STEP,
  FilterType,
  MIN_COUNT,
  MAX_COUNT,
  TOP_COMMENT_COUNT,
  TOP_RATED_COUNT,
  SortType,
  TitlesSection,
  UserAction,
  UpdateType,
  TEXT_SIZE,
  TEXT_LIMIT,
  Method,
  AUTHORIZATION,
  END_POINT
};
