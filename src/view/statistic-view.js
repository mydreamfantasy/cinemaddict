import AbstractView from '../framework/view/abstract-view.js';

function createStatisticTemplate(filmsCount) {
  return `<p>${filmsCount} movies inside</p>`;
}

export default class StatisticView extends AbstractView {
  #filmsCount = null;

  constructor({filmsCount}){
    super();
    this.#filmsCount = filmsCount;
  }

  get template() {
    return createStatisticTemplate(this.#filmsCount);
  }
}
