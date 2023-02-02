import { FILM_COUNT_PER_STEP } from '../const.js';
import { render, remove } from '../framework/render.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';

export default class ShowMorePresenter {
  #renderFilms = null;
  #renderedFilmCount = FILM_COUNT_PER_STEP;
  #filmList = null;
  #showMoreButtonComponent = null;
  #films = null;

  constructor({renderFilms, filmList, films}) {
    this.#renderFilms = renderFilms;
    this.#filmList = filmList;
    this.#films = films;
  }

  init () {
    this.#showMoreButtonComponent = new ShowMoreButtonView ({
      onClick: this.#handleShowMoreButtonClick
    });

    render(this.#showMoreButtonComponent, this.#filmList);
  }

  #handleShowMoreButtonClick = () => {
    const filmCount = this.#films.length;

    const newRenderFilmCount = Math.min(filmCount, this.#renderedFilmCount + FILM_COUNT_PER_STEP);
    const films = this.#films.slice(this.#renderedFilmCount, newRenderFilmCount);

    this.#renderFilms(films);
    this.#renderedFilmCount = newRenderFilmCount;

    if (this.#renderedFilmCount >= filmCount) {
      this.#showMoreButtonComponent.element.remove();
    }
  };

  destroy() {
    remove(this.#showMoreButtonComponent);
  }
}
