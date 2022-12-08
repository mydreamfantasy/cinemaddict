import dayjs from 'dayjs';

const DATE_FORMAT = 'MMMM D, YYYY h:mm A';

const humanizeCommentDate = (date) => date ? dayjs(date).format(DATE_FORMAT) : '';

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

export {
  getRandomArrayElement,
  getRandomPositiveFloat,
  getRandomPositiveInteger,
  humanizeCommentDate
};
