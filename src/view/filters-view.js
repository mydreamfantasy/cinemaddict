import { FilterDictionary } from '../const.js';
import AbstractView from '../framework/view/abstract-view.js';

function createFilterItemTemplate(filter, count, isChecked) {

  return (
    `<a href="#${filter}" class="main-navigation__item
     ${isChecked ? 'main-navigation__item--active' : ''}">
      ${FilterDictionary[filter]}

      ${filter === 'all' ? '' :
      `<span class="main-navigation__item-count">${count}</span>`}
     </a>`
  );
}

function createFiltersTemplate(filterItems) {

  const filterItemsTemplate = Object.entries(filterItems)
    .map(([filter, count], index) => createFilterItemTemplate(filter,count, index === 0))
    .join('');

  return (
    `<nav class="main-navigation">
      ${filterItemsTemplate}
    </nav>
    `
  );
}

export default class FiltersView extends AbstractView {
  #filters = null;

  constructor({filters}) {
    super();
    this.#filters = filters;
  }

  get template() {
    return createFiltersTemplate(this.#filters);
  }
}
