import {createElement} from '../render.js';

function createCommentListTemplate() {
  return '<ul class="film-details__comments-list"></ul>';
}

export default class CommentListView {
  #element = null;

  get template() {
    return createCommentListTemplate();
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
