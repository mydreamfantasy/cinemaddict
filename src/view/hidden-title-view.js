import {createElement} from '../render.js';

function createHiddenTitleTemplate() {
  return '<h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>';
}

export default class HiddenTitleView {
  #element = null;

  get template() {
    return createHiddenTitleTemplate();
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
