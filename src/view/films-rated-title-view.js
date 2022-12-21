import AbstractView from '../framework/view/abstract-view.js';

function createFilmsRatedTitleTemplate() {
  return '<h2 class="films-list__title">Top rated</h2>';
}
export default class FilmsRatedTitleView extends AbstractView {
  get template() {
    return createFilmsRatedTitleTemplate();
  }
}
