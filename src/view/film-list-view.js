import AbstractView from '../framework/view/abstract-view.js';

function createFilmListTemplate() {
  return '<section class="films-list"></section>';
}

export default class FilmListView extends AbstractView {
  get template() {
    return createFilmListTemplate();
  }
}
