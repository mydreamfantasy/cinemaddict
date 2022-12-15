import {createElement} from '../render.js';

const NoFilms = {
  ALL_FILMS: 'There are no movies in our database',
  WATCHLIST: 'There are no movies to watch now',
  HISTORY: 'There are no watched movies now',
  FAVORITE:'There are no favorite movies now',
};

function createNoFilmsTemplate () {
  return `<h2 class="films-list__title">${NoFilms.ALL_FILMS}</h2>`;
}

export default class NoFilmsView {
  #element = null;

  get template() {
    return createNoFilmsTemplate();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
