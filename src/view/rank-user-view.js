import { UserRatings } from '../const.js';
import AbstractView from '../framework/view/abstract-view.js';
import { watchedFilmsFilter } from '../utils/utils.js';


const getUserRating = (films) => {
  const watchedFilmsCount = watchedFilmsFilter(films);

  for (const rating in UserRatings) {
    if ((UserRatings[rating].min <= watchedFilmsCount && watchedFilmsCount <= UserRatings[rating].max)
      || (UserRatings[rating].min <= watchedFilmsCount && UserRatings[rating].max === null)
      || (UserRatings[rating].min === null && watchedFilmsCount <= UserRatings[rating].max)) {
      return UserRatings[rating].rating;
    }
  }
};

function createRankUserTemplate(films) {
  return (
    `<section class="header__profile profile ${getUserRating(films) === undefined ? 'visually-hidden' : ''}" >
      <p class="profile__rating">${getUserRating(films)}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>
    `
  );
}

export default class RankUserView extends AbstractView {
  #films = [];

  constructor(films) {
    super();
    this.#films = films;
  }

  get template() {
    return createRankUserTemplate(this.#films);
  }
}
