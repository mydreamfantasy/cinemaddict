import AbstractView from '../framework/view/abstract-view.js';

function createFilmsCommentedTitleTemplate() {
  return '<h2 class="films-list__title">Most commented</h2>';
}
export default class FilmsCommentedTitleView extends AbstractView {
  get template() {
    return createFilmsCommentedTitleTemplate();
  }
}
