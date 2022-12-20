import AbstractView from '../framework/view/abstract-view.js';

function createHiddenTitleTemplate() {
  return '<h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>';
}

export default class HiddenTitleView extends AbstractView {
  get template() {
    return createHiddenTitleTemplate();
  }
}
