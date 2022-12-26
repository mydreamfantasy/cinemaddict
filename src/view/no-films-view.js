import { NoFilms } from '../const.js';
import AbstractView from '../framework/view/abstract-view.js';


function createNoFilmsTemplate () {
  return `<h2 class="films-list__title">${NoFilms.ALL_FILMS}</h2>`;
}

export default class NoFilmsView extends AbstractView {
  get template() {
    return createNoFilmsTemplate();
  }
}
