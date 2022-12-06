import {createElement} from '../render.js';

function createHiddenTitleTemplate() {
  return '<h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>';
}

export default class HiddenTitleView {
  getTemplate() {
    return createHiddenTitleTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
