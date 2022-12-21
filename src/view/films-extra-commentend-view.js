import AbstractView from '../framework/view/abstract-view.js';

function createFilmsExtraCommentedTemplate() {
  return '<section class="films-list films-list--extra"></section>';
}

export default class FilmsExtraCommentedView extends AbstractView {
  get template() {
    return createFilmsExtraCommentedTemplate();
  }
}
