import AbstractView from '../framework/view/abstract-view.js';
import { countOfFilms } from '../mock/films.js';

function createStatisticTemplate() {
  return `<p>${countOfFilms} movies inside</p>`;
}

export default class StatisticView extends AbstractView {
  get template() {
    return createStatisticTemplate();
  }
}
