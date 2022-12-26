import AbstractView from '../framework/view/abstract-view.js';

function createFilterItemTemplate(filter, isChecked) {
  const {name, count} = filter;

  return (
    `<a href="#${name}" class="main-navigation__item
     ${isChecked ? 'main-navigation__item--active' : ''}">
      ${name === 'all' ? 'All Movies' : name.charAt(0).toUpperCase()}${name === 'all' ? '' : name.slice(1)}

      <span class="main-navigation__item-count ${name === 'all' ? 'visually-hidden' : ''}"
      >
      ${count}
      </span>
     </a>`
  );
}

function createFiltersTemplate(filterItems) {

  const filterItemsTemplate = filterItems
    .map((filter, index) => createFilterItemTemplate(filter, index === 0))
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
