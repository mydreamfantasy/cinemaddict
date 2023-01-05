import {
  getRandomArrayElement,
  getRandomPositiveFloat,
  getRandomPositiveInteger,
  makeCounterIndex,
  getArray,
  getTimeFromMins
} from '../utils/utils.js';

import {
  FILM_TITLE,
  FILM_TITLE_ORIGINAL,
  DESCRIPTION,
  DIRECTOR,
  ACTORS,
  WRITERS,
  AUTHOR,
  COMMENT,
  COUNTRY,
  FILMS_IMG,
  GENRE,
  GENRES,
  EMOJI,
  AGE,
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
  MIN_COUNT,
  MAX_COUNT
} from '../const.js';

import dayjs from 'dayjs';
import { nanoid } from 'nanoid';

const counterComments = makeCounterIndex();
// const counterFilms = makeCounterIndex();

const createComment = () => ({
  id: `${counterComments()}`,
  author: `${getRandomArrayElement(AUTHOR)}`,
  comment: `${getRandomArrayElement(COMMENT)}`,
  commentDate: `${dayjs().format(DATE_FORMAT)}`,
  emotion: getRandomArrayElement(EMOJI),
});

const mockComments = Array.from({ length:COMMENT_COUNT }, createComment);

const getRandomFilm = () => ({
  id: nanoid(),
  filmInfo: {
    img: `./images/posters/${getRandomArrayElement(FILMS_IMG)}`,
    title: `${getRandomArrayElement(FILM_TITLE)}`,
    originalTitle: `${getRandomArrayElement(FILM_TITLE_ORIGINAL)}`,
    rating: getRandomPositiveFloat(MIN_RATING, MAX_RATING),
    ageRating: `${getRandomArrayElement(AGE)}+`,
    year: getRandomPositiveInteger(MIN_YEAR, MAX_YEAR),
    duration: getTimeFromMins(getRandomPositiveInteger(MIN_DURATION, MAX_DURATION)),
    genre: getRandomArrayElement(GENRE),
    genres: getArray(GENRES).join(' '),
    description: `${getRandomArrayElement(DESCRIPTION)}`,
    commentsCount: getRandomPositiveInteger(MIN_COMMENTS, MAX_COMMENTS),
    director: `${getRandomArrayElement(DIRECTOR)}`,
    writers: getArray(WRITERS).join(', '),
    actors: getArray(ACTORS).join(', '),
    release: {
      date: `${dayjs().format(DATE_FORMAT_FILM)}`,
      releaseCountry: `${getRandomArrayElement(COUNTRY)}`
    },
  },
  userDetails: {
    watchlist: Math.random() > 0.5,
    alreadyWatched: Math.random() > 0.5,
    watchingDate: `${dayjs().format(DATE_FORMAT)}`,
    favorite: Math.random() > 0.5
  },
  comments: getArray(mockComments).map(({id}) => id),
});

const countOfFilms = getRandomPositiveInteger(MIN_COUNT, MAX_COUNT);

export { getRandomFilm, mockComments, countOfFilms };
