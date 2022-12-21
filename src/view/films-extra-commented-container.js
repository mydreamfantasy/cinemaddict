import AbstractView from '../framework/view/abstract-view.js';

function createFilmsExtraCommentedContainerTemplate() {
  return '<div class="films-list__container"></div>';
}
export default class FilmsExtraCommentedContainerView extends AbstractView {
  get template() {
    return createFilmsExtraCommentedContainerTemplate();
  }
}
