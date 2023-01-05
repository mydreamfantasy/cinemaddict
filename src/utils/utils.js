
const getRandomArrayElement = (items) => items[Math.floor(Math.random() * items.length)];

const getRandomPositiveFloat = (a, b, digits = 1) => {
  if (a < 0 || b < 0 || digits < 0) {
    return NaN;
  }
  const lower = Math.min(a, b);
  const upper = Math.max(a, b);
  const result = Math.random() * (upper - lower) + lower;
  return Number(result.toFixed(digits));
};

const getRandomPositiveInteger = (a, b) => {
  if (a < 0 || b < 0) {
    return NaN;
  }
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const makeCounterIndex = () => {
  let count = 0;

  return () => {
    count++;

    return count;
  };
};

const getArray = (array) => {
  const maxLength = array.length;
  const lengthOfArray = getRandomPositiveInteger(1, maxLength);
  const arrayRandom = [];

  while (arrayRandom.length < lengthOfArray) {
    const indexOfEl = getRandomPositiveInteger(0, maxLength - 1);
    const el = array[indexOfEl];

    if (!arrayRandom.includes(el)) {
      arrayRandom.push(el);
    }
  }
  return arrayRandom;
};

function getTimeFromMins(mins) {
  const hours = Math.trunc(mins / 60);
  const minutes = mins % 60;
  return `${hours }h ${ minutes }m`;
}

const isEscapeEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';


function updateItem(items, update) {
  return items.map((item) => item.id === update.id ? update : item);
}

// function getWeightForNullDate(dateA, dateB) {
//   if (dateA === null && dateB === null) {
//     return 0;
//   }

//   if (dateA === null) {
//     return 1;
//   }

//   if (dateB === null) {
//     return -1;
//   }

//   return null;
// }

// function sortFilmDate(film) {
//   return film.sort((filmA, filmB) => filmA.filmInfo.year - filmB.filmInfo.year);

// }

// function sortFilmRating(filmA, filmB) {
//   const weight = getWeightForNullDate(filmA.filmInfo.rating, filmB.filmInfo.rating);

//   return weight ?? filmA.filmInfo.rating;
// }

export {
  getRandomArrayElement,
  getRandomPositiveFloat,
  getRandomPositiveInteger,
  makeCounterIndex,
  getArray,
  getTimeFromMins,
  isEscapeEvent,
  updateItem,
  // sortFilmDate,
  // sortFilmRating
};
