import AbstractView from '../framework/view/abstract-view.js';

function createFilmsExtraRatedTemplate() {
  return '<section class="films-list films-list--extra"></section>';
}

export default class FilmsExtraRatedView extends AbstractView {
  get template() {
    return createFilmsExtraRatedTemplate();
  }
}
