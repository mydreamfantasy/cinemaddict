
import { FILM_COUNT_PER_STEP } from '../const.js';
import { render, remove } from '../framework/render.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';

export default class ShowMorePresenter {

  #renderFilms = null;
  #renderedFilmCount = FILM_COUNT_PER_STEP;
  #filmList = null;
  #catalogFilms = null;
  #showMoreButtonComponent = null;

  constructor({renderFilms, filmList, maxFilmsAmount}) {
    this.#renderFilms = renderFilms;
    this.#filmList = filmList;
    this.#catalogFilms = maxFilmsAmount;
  }

  init () {
    this.#showMoreButtonComponent = new ShowMoreButtonView ({
      onClick: this.#handleShowMoreButtonClick
    });

    render(this.#showMoreButtonComponent, this.#filmList);
  }

  destroy() {
    remove(this.#showMoreButtonComponent);
  }

  #handleShowMoreButtonClick = () => {

    this.#renderFilms(this.#renderedFilmCount, this.#renderedFilmCount + FILM_COUNT_PER_STEP);

    this.#renderedFilmCount += FILM_COUNT_PER_STEP;

    if (this.#renderedFilmCount >= this.#catalogFilms) {
      this.#showMoreButtonComponent.element.remove();
    }
  };
}
