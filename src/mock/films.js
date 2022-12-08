import {
  getRandomArrayElement,
  getRandomPositiveFloat,
  getRandomPositiveInteger
} from '../utils.js';

import {
  FILMS,
  GENRES,
  EMOJI,
  AGE,
  MAX_RATING,
  MIN_RATING,
  MIN_YEAR,
  MAX_YEAR,
  MIN_COMMENTS,
  MAX_COMMENTS
} from '../const.js';

const mockComments = [
  {
    id: 1,
    author: 'Ilya O\'Reilly',
    comment: 'a film that changed my life, a true masterpiece, post-credit scene was just amazing omg.',
    date: '2018-11-11T16:12:32.554Z',
    emotion: getRandomArrayElement(EMOJI),
  },

  {
    id: 2,
    author: 'Ivan da Maria',
    comment: 'it\'s amazing film, i want to be protagonist!!!',
    date: '2015-01-11T16:12:32.554Z',
    emotion: getRandomArrayElement(EMOJI),
  },

  {
    id: 3,
    author: 'Anonimus',
    comment: 'WTF?? Do you call it a masterpiece??',
    date: '2009-12-11T16:12:32.554Z',
    emotion: getRandomArrayElement(EMOJI),
  },

  {
    id: 4,
    author: 'Anton',
    comment: 'Unfortunatelly, I wanted to cry after this film, it\'s sooooo boring',
    date: '2007-04-11T16:12:32.554Z',
    emotion: getRandomArrayElement(EMOJI),
  },

  {
    id: 5,
    author: 'Feofan Fion',
    comment: 'hmmm... many thoughts, but I think I would rewatch',
    date: '2020-08-11T16:12:32.554Z',
    emotion: getRandomArrayElement(EMOJI),
  },

  {
    id: 6,
    author: 'Magnat',
    comment: 'incredible!!!111',
    date: '2007-02-11T16:12:32.554Z',
    emotion: getRandomArrayElement(EMOJI),
  },

  {
    id: 7,
    author: 'Philosopher',
    comment: 'we can think about this film a lot of time and found new interesting things and facts. I think I exist that say my favorite philosopher',
    date: '2019-05-11T16:12:32.554Z',
    emotion: getRandomArrayElement(EMOJI),
  }
];


const mockFilms = [
  {
    id: 1,
    filmInfo: {
      img: `./images/posters/${getRandomArrayElement(FILMS)}`,
      title: 'Рыбовая тефтеля',
      originalTitle: 'Fish meatball',
      rating: getRandomPositiveFloat(MIN_RATING, MAX_RATING),
      ageRating: `${getRandomArrayElement(AGE)}+`,
      year: getRandomPositiveInteger(MIN_YEAR, MAX_YEAR),
      duration: '1h40min',
      genre: getRandomArrayElement(GENRES),
      description: 'Фильм о невероятных приключениях котов, которым показывают рыбов.',
      commentsCount: getRandomPositiveInteger(MIN_COMMENTS, MAX_COMMENTS),
      director: 'Lorem ipsum',
      writers: [
        'Takeshi Kitano',
        'Morgan Freeman'
      ],
      actors: [
        'Morgan Freeman',
        'Morgan Freeman',
        'Morgan Freeman'
      ],
      release: {
        date: '2019-05-11T00:00:00.000Z',
        releaseCountry: 'Finland'
      },
    },
    userDetails: {
      watchlist: false,
      alreadyWatched: true,
      watchingDate: '2019-04-12T16:12:32.554Z',
      favorite: false
    },
    mockComments: [1, 2, 3],
  },
  {
    id: 2,
    filmInfo: {
      img: `./images/posters/${getRandomArrayElement(FILMS)}`,
      title: 'Волк не выступает',
      originalTitle: 'Wolf in a circle',
      rating: getRandomPositiveFloat(MIN_RATING, MAX_RATING),
      ageRating: `${getRandomArrayElement(AGE)}+`,
      year: getRandomPositiveInteger(MIN_YEAR, MAX_YEAR),
      duration: '1h50min',
      genre: getRandomArrayElement(GENRES),
      description: 'Невероятные истории о которых невозможно молчать, волк, который слабее льва и тигра, впервые выступает в цирке',
      commentsCount: getRandomPositiveInteger(MIN_COMMENTS, MAX_COMMENTS),
      director: 'Lorem ipsum',
      writers: [
        'Takeshi Kitano',
        'Anybody Anything'
      ],
      actors: [
        'Leonardo Freeman',
        'Morgan Longman',
        'Antonio Fagundes'
      ],
      release: {
        date: '2019-05-11T00:00:00.000Z',
        releaseCountry: 'Russia'
      },
    },
    userDetails: {
      watchlist: true,
      alreadyWatched: false,
      watchingDate: '',
      favorite: false
    },
    mockComments: [1, 2, 3, 6],
  },
  {
    id: 3,
    filmInfo: {
      img: `./images/posters/${getRandomArrayElement(FILMS)}`,
      title: 'Нет ничего важнее семьи',
      originalTitle: 'Family is the first',
      rating: getRandomPositiveFloat(MIN_RATING, MAX_RATING),
      ageRating: `${getRandomArrayElement(AGE)}+`,
      year: getRandomPositiveInteger(MIN_YEAR, MAX_YEAR),
      duration: '1h50min',
      genre: getRandomArrayElement(GENRES),
      description: 'Это нужно видеть и помнить',
      commentsCount: getRandomPositiveInteger(MIN_COMMENTS, MAX_COMMENTS),
      director: 'Lorem ipsum',
      writers: [
        'Vin Diesel',
        'Anybody Anything'
      ],
      actors: [
        'Vin Diesel',
        'Vin Diesel',
      ],
      release: {
        date: '2019-05-11T00:00:00.000Z',
        releaseCountry: 'USA'
      },
    },
    userDetails: {
      watchlist: false,
      alreadyWatched: true,
      watchingDate: '2029-04-12T16:12:32.554Z',
      favorite: true
    },
    mockComments: [1, 2, 3, 6],
  },
  {
    id: 4,
    filmInfo: {
      img: `./images/posters/${getRandomArrayElement(FILMS)}`,
      title: 'Не нужоны интернеты',
      originalTitle: 'Internet banned',
      rating: getRandomPositiveFloat(MIN_RATING, MAX_RATING),
      ageRating: `${getRandomArrayElement(AGE)}+`,
      year: getRandomPositiveInteger(MIN_YEAR, MAX_YEAR),
      duration: '1h10min',
      genre: getRandomArrayElement(GENRES),
      description: '"Выключайте интернеты!". История о том, что не всем нужны интернеты, кому-то достаточно телефона',
      commentsCount: getRandomPositiveInteger(MIN_COMMENTS, MAX_COMMENTS),
      director: 'Somebody Somewhere',
      writers: [
        'Old Woman',
      ],
      actors: [
        'Helen Mills',
        'Yan Smith',
      ],
      release: {
        date: '2019-05-11T00:00:00.000Z',
        releaseCountry: 'Uganda'
      },
    },
    userDetails: {
      watchlist: true,
      alreadyWatched: false,
      watchingDate: '',
      favorite: false
    },
    mockComments: [],
  },
  {
    id: 5,
    filmInfo: {
      img: `./images/posters/${getRandomArrayElement(FILMS)}`,
      title: 'Перст Фомы',
      originalTitle: 'Ring of Foma',
      rating: getRandomPositiveFloat(MIN_RATING, MAX_RATING),
      year: getRandomPositiveInteger(MIN_YEAR, MAX_YEAR),
      duration: '2h50min',
      genre: getRandomArrayElement(GENRES),
      description: 'Известнейшая трилогия в новом исполнении. Не нуждается в представлении',
      commentsCount: getRandomPositiveInteger(MIN_COMMENTS, MAX_COMMENTS),
      director: 'Morgot',
      writers: [
        'Gholum',
        'Sauron'
      ],
      actors: [
        'Frodo Baggins',
        'Gendalf Grey',
        'Legolas',
        'Aragorn is son of Aratorn'
      ],
      release: {
        date: '2019-05-11T00:00:00.000Z',
        releaseCountry: 'New Zealand'
      },
    },
    userDetails: {
      watchlist: false,
      alreadyWatched: true,
      watchingDate: '2009-04-12T16:12:32.554Z',
      favorite: true
    },
    mockComments: [1, 2, 3, 6, 4, 7],
  },
  {
    id: 6,
    filmInfo: {
      img: `./images/posters/${getRandomArrayElement(FILMS)}`,
      title: 'День прыщей',
      originalTitle: 'Acne day',
      rating: getRandomPositiveFloat(MIN_RATING, MAX_RATING),
      ageRating: `${getRandomArrayElement(AGE)}+`,
      year: getRandomPositiveInteger(MIN_YEAR, MAX_YEAR),
      duration: '3h50min',
      genre: getRandomArrayElement(GENRES),
      description: 'Так случается, что в один день они приходят и портят все планы. История, знакомая каждому',
      commentsCount: getRandomPositiveInteger(MIN_COMMENTS, MAX_COMMENTS),
      director: 'Vanish Pupovnik',
      writers: [
        'Igrek Nother',
        'Ixes Brown'
      ],
      actors: [
        'Animal Flower',
        'Kazimir Kazimic',
        'Apple Penapple',
        'Henry Hurt'
      ],
      release: {
        date: '2010-07-31T00:00:00.000Z',
        releaseCountry: 'Neitherland'
      },
    },
    userDetails: {
      watchlist: true,
      alreadyWatched: true,
      watchingDate: '2009-04-12T16:12:32.554Z',
      favorite: true
    },
    mockComments: [1, 2, 3, 6, 4, 7],
  },
];

const getRandomFilm = () => getRandomArrayElement(mockFilms);

const getRandomComment = () => getRandomArrayElement(mockComments);

export { getRandomFilm, getRandomComment };
