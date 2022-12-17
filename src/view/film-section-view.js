import AbstractView from '../framework/view/abstract-view.js';

function createFilmSectionTemplate() {
  return '<section class="films"></section>';
}

export default class FilmSectionView extends AbstractView {
  get template() {
    return createFilmSectionTemplate();
  }
}
