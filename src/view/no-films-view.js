import { FilterType } from '../const.js';
import AbstractView from '../framework/view/abstract-view.js';

const NoFilmsTextType = {
  [FilterType.ALL]: 'There are no movies in our database',
  [FilterType.WATCHLIST]: 'There are no movies to watch now',
  [FilterType.HISTORY]: 'There are no watched movies now',
  [FilterType.FAVORITE]:'There are no favorite movies now',
};

function createNoFilmsTemplate (filterType) {

  const noFilmsTextValue = NoFilmsTextType[filterType];

  return `<h2 class="films-list__title">${noFilmsTextValue}</h2>`;
}

export default class NoFilmsView extends AbstractView {
  #filterType = null;

  constructor({filterType}) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createNoFilmsTemplate(this.#filterType);
  }
}
