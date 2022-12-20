import AbstractView from '../framework/view/abstract-view.js';

function createStatisticTemplate() {
  return '<p>130 291 movies inside</p>';
}

export default class StatisticView extends AbstractView {
  get template() {
    return createStatisticTemplate();
  }
}
