import AbstractView from '../framework/view/abstract-view.js';

function createCommentListTemplate() {
  return '<ul class="film-details__comments-list"></ul>';
}

export default class CommentListView extends AbstractView {
  get template() {
    return createCommentListTemplate();
  }
}
