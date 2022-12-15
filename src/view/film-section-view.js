import {createElement} from '../render.js';

function createFilmSectionTemplate() {
  return '<section class="films"></section>';
}

export default class FilmSectionView {
  #element = null;

  get template() {
    return createFilmSectionTemplate();
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
