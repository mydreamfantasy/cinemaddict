import {
  getRandomArrayElement,
  getRandomPositiveFloat,
  getRandomPositiveInteger,
  makeCounterIndex,
  getArray
} from '../utils.js';

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
  BOOLEAN,
  FILMS_IMG,
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
  DATE_FORMAT_FILM
} from '../const.js';

import dayjs from 'dayjs';

const counterComments = makeCounterIndex();
const counterFilms = makeCounterIndex();

export const mockComments = [
  {
    id: `${counterComments()}`,
    author: `${getRandomArrayElement(AUTHOR)}`,
    comment: `${getRandomArrayElement(COMMENT)}`,
    commentDate: `${dayjs().format(DATE_FORMAT)}`,
    emotion: getRandomArrayElement(EMOJI),
  },
  {
    id: `${counterComments()}`,
    author: `${getRandomArrayElement(AUTHOR)}`,
    comment: `${getRandomArrayElement(COMMENT)}`,
    commentDate: `${dayjs().format(DATE_FORMAT)}`,
    emotion: getRandomArrayElement(EMOJI),
  },
  {
    id: `${counterComments()}`,
    author: `${getRandomArrayElement(AUTHOR)}`,
    comment: `${getRandomArrayElement(COMMENT)}`,
    commentDate: `${dayjs().format(DATE_FORMAT)}`,
    emotion: getRandomArrayElement(EMOJI),
  }
  , {
    id: `${counterComments()}`,
    author: `${getRandomArrayElement(AUTHOR)}`,
    comment: `${getRandomArrayElement(COMMENT)}`,
    commentDate: `${dayjs().format(DATE_FORMAT)}`,
    emotion: getRandomArrayElement(EMOJI),
  }
  , {
    id: `${counterComments()}`,
    author: `${getRandomArrayElement(AUTHOR)}`,
    comment: `${getRandomArrayElement(COMMENT)}`,
    commentDate: `${dayjs().format(DATE_FORMAT)}`,
    emotion: getRandomArrayElement(EMOJI),
  }
  , {
    id: `${counterComments()}`,
    author: `${getRandomArrayElement(AUTHOR)}`,
    comment: `${getRandomArrayElement(COMMENT)}`,
    commentDate: `${dayjs().format(DATE_FORMAT)}`,
    emotion: getRandomArrayElement(EMOJI),
  },
  {
    id: `${counterComments()}`,
    author: `${getRandomArrayElement(AUTHOR)}`,
    comment: `${getRandomArrayElement(COMMENT)}`,
    commentDate: `${dayjs().format(DATE_FORMAT)}`,
    emotion: getRandomArrayElement(EMOJI),
  }
  , {
    id: `${counterComments()}`,
    author: `${getRandomArrayElement(AUTHOR)}`,
    comment: `${getRandomArrayElement(COMMENT)}`,
    commentDate: `${dayjs().format(DATE_FORMAT)}`,
    emotion: getRandomArrayElement(EMOJI),
  }
];

const getRandomFilm = () => ({
  id: `${counterFilms()}`,
  filmInfo: {
    img: `./images/posters/${getRandomArrayElement(FILMS_IMG)}`,
    title: `${getRandomArrayElement(FILM_TITLE)}`,
    originalTitle: `${getRandomArrayElement(FILM_TITLE_ORIGINAL)}`,
    rating: getRandomPositiveFloat(MIN_RATING, MAX_RATING),
    ageRating: `${getRandomArrayElement(AGE)}+`,
    year: getRandomPositiveInteger(MIN_YEAR, MAX_YEAR),
    duration: getRandomPositiveInteger(MIN_DURATION, MAX_DURATION),
    genre: getRandomArrayElement(GENRES),
    genres: getArray(GENRES),
    description: `${getRandomArrayElement(DESCRIPTION)}`,
    commentsCount: getRandomPositiveInteger(MIN_COMMENTS, MAX_COMMENTS),
    director: `${getRandomArrayElement(DIRECTOR)}`,
    writers: getArray(WRITERS),
    actors: getArray(ACTORS),
    release: {
      date: `${dayjs().format(DATE_FORMAT_FILM)}`,
      releaseCountry: `${getRandomArrayElement(COUNTRY)}`
    },
  },
  userDetails: {
    watchlist: `${getRandomArrayElement(BOOLEAN)}`,
    alreadyWatched: `${getRandomArrayElement(BOOLEAN)}`,
    watchingDate: `${dayjs().format(DATE_FORMAT)}`,
    favorite: `${getRandomArrayElement(BOOLEAN)}`
  },
  mockComments: getArray(mockComments),
});

// console.log(mockComments),
// console.log(getRandomFilm())

// const getRandomComment = () => getRandomArrayElement(mockComments);

export { getRandomFilm };
