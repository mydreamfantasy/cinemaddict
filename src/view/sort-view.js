import { SortType } from '../const.js';
import AbstractView from '../framework/view/abstract-view.js';

function createSortTemplate(currentSortType) {
  return (
    `<ul class="sort">
      <li>
        <a href="#" class="sort__button ${currentSortType === SortType.DEFAULT ? 'sort__button--active' : ''}"
          data-sort-type="${SortType.DEFAULT}">
        Sort by default
        </a>
      </li>

      <li>
        <a href="#" class="sort__button ${currentSortType === SortType.DATE ? 'sort__button--active' : ''}"
          data-sort-type="${SortType.DATE}">
        Sort by date
        </a>
      </li>

      <li>
        <a href="#" class="sort__button ${currentSortType === SortType.RATING ? 'sort__button--active' : ''}"
          data-sort-type="${SortType.RATING}">
        Sort by rating
        </a>
      </li>
    </ul>
    `
  );
}

export default class SortView extends AbstractView {
  #handleSortTypeChange = null;
  #currentSortType = null;

  constructor({onSortTypeChange, currentSortType}) {
    super();
    this.#handleSortTypeChange = onSortTypeChange;
    this.#currentSortType = currentSortType;
    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  }

  get template() {
    return createSortTemplate(this.#currentSortType);
  }

  #sortTypeChangeHandler = (evt) => {
    if (!evt.target.dataset.sortType) {
      return;
    }

    evt.preventDefault();
    this.#handleSortTypeChange(evt.target.dataset.sortType);
  };
}
