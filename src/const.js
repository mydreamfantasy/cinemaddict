const FILM_TITLE = [
  'Рыбовая тефтеля',
  'Волк не выступает',
  'Нет ничего важнее семьи',
  'Не нужоны интернеты',
  'Перст Фомы',
  'День прыщей'
];

const FILM_TITLE_ORIGINAL = [
  'Acne day',
  'Ring of Foma',
  'Internet banned',
  'Family is the first',
  'Wolf in a circle',
  'Fish meatball'
];

const DESCRIPTION = [
  'Фильм о невероятных приключениях котов, которым показывают рыбов.',
  'Невероятные истории о которых невозможно молчать, волк, который слабее льва и тигра, впервые выступает в цирке',
  'Это нужно видеть и помнить',
  '"Выключайте интернеты!". История о том, что не всем нужны интернеты, кому-то достаточно телефона',
  'Известнейшая трилогия в новом исполнении. Не нуждается в представлении',
  'Так случается, что в один день они приходят и портят все планы. История, знакомая каждому'
];

const DIRECTOR = [
  'Vanish Pupovnik',
  'Morgot',
  'Somebody Somewhere',
  'Lorem Ipsum'
];

const WRITERS = [
  'Takeshi Kitano',
  'Morgan Freeman',
  'Vin Diesel',
  'Anybody Anything',
  'Old Woman',
  'Gholum',
  'Sauron',
  'Igrek Nother',
  'Ixes Brown'
];

const ACTORS = [
  'Animal Flower',
  'Kazimir Kazimic',
  'Apple Penapple',
  'Henry Hurt',
  'Frodo Baggins',
  'Gendalf Grey',
  'Legolas',
  'Aragorn is son of Aratorn',
  'Helen Mills',
  'Yan Smith',
  'Vin Diesel',
  'Leonardo Freeman',
  'Morgan Longman',
  'Antonio Fagundes',
  'Morgan Freeman'
];

const COUNTRY = [
  'Russia',
  'Finland',
  'Neitherland',
  'New Zealand',
  'Uganda',
  'USA'
];

const BOOLEAN = [
  true,
  false
];

const FILMS_IMG = [
  'made-for-each-other.png',
  'popeye-meets-sinbad.png',
  'sagebrush-trail.jpg',
  'santa-claus-conquers-the-martians.jpg',
  'the-dance-of-life.jpg',
  'the-great-flamarion.jpg',
  'the-man-with-the-golden-arm.jpg'
];

const GENRE = [
  'comedy',
  'drama',
  'action',
  'crime',
  'adventure',
  'romance',
  'fantasy',
  'animation'
];

const GENRES = [
  'Comedy',
  'Drama',
  'Action',
  'Crime',
  'Adventure',
  'Romance',
  'Fantasy',
  'Animation'
];

const EMOJI = [
  'smile',
  'sleeping',
  'puke',
  'angry'
];

const AUTHOR = [
  'Philosopher',
  'Magnat',
  'Feofan Fion',
  'Anton',
  'Anonimus',
  'Ivan da Maria',
  'Ilya O\'Reilly'
];

const COMMENT = [
  'a film that changed my life, a true masterpiece, post-credit scene was just amazing omg.',
  'it\'s amazing film, i want to be protagonist!!!',
  'WTF?? Do you call it a masterpiece??',
  'Unfortunatelly, I wanted to cry after this film, it\'s sooooo boring',
  'hmmm... many thoughts, but I think I would rewatch',
  'incredible!!!111',
  'we can think about this film a lot of time and found new interesting things and facts. I think I exist that say my favorite philosopher'
];

const AGE = [
  0,
  4,
  6,
  10,
  14,
  18
];


const NoFilms = {
  ALL_FILMS: 'There are no movies in our database',
  WATCHLIST: 'There are no movies to watch now',
  HISTORY: 'There are no watched movies now',
  FAVORITE:'There are no favorite movies now',
};

const FilterType = {
  ALL: 'all',
  WATCHLIST: 'watchlist',
  HISTORY: 'history',
  FAVORITE: 'favorite',
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

export {
  FILM_TITLE,
  FILM_TITLE_ORIGINAL,
  DESCRIPTION,
  DIRECTOR,
  ACTORS,
  WRITERS,
  COUNTRY,
  BOOLEAN,
  FILMS_IMG,
  GENRE,
  GENRES,
  EMOJI,
  AUTHOR,
  COMMENT,
  AGE,
  NoFilms,
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
  TOP_RATED_COUNT
};
