import {createElement} from '../render.js';

function createCommentListTemplate() {
  return '<ul class="film-details__comments-list"></ul>';
}

export default class CommentListView {
  getTemplate() {
    return createCommentListTemplate();
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
