import { FILM_COUNT_PER_STEP } from '../const.js';
import { render, RenderPosition } from '../framework/render.js';
// import { isEscapeEvent } from '../utils/utils.js';
// import CardView from '../view/card-view.js';
import FilmListContainerView from '../view/film-list-container-view.js';
import FilmListView from '../view/film-list-view.js';
// import FilmPopupView from '../view/film-popup-view.js';
import FilmSectionView from '../view/film-section-view.js';
import HiddenTitleView from '../view/hidden-title-view.js';
import NoFilmsView from '../view/no-films-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import FilmPresenter from './film-presenter.js';

export default class FilmsPresenter {
  #filmsContainer = null;
  #filmsModel = null;
  #commentsModel = null;
  #showMoreButtonComponent = null;
  #catalogFilms = [];
  #commentsList = [];

  #renderedFilmCount = FILM_COUNT_PER_STEP;
  #filmSection = new FilmSectionView();
  #filmList = new FilmListView();
  #filmListContainer = new FilmListContainerView();
  #noFilmsComponent = new NoFilmsView();

  constructor({filmsContainer, filmsModel, commentsModel}) {
    this.#filmsContainer = filmsContainer;
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;
  }

  init() {
    this.#catalogFilms = [...this.#filmsModel.films];
    this.#commentsList = [...this.#commentsModel.comments];
    render(this.#filmSection, this.#filmsContainer);
    render(this.#filmList, this.#filmSection.element);
    render(new HiddenTitleView(), this.#filmList.element);
    render(this.#filmListContainer, this.#filmList.element);

    this.#renderFilmList();
  }

  #handleShowMoreButtonClick = () => {

    this.#renderFilms(this.#renderedFilmCount, this.#renderedFilmCount + FILM_COUNT_PER_STEP);

    this.#renderedFilmCount += FILM_COUNT_PER_STEP;

    if (this.#renderedFilmCount >= this.#catalogFilms.length) {
      this.#showMoreButtonComponent.element.remove();
      this.#showMoreButtonComponent.removeElement();
    }
  };

  #renderFilm(film) {

    const filmPresenter = new FilmPresenter({
      FilmListContainer: this.#filmListContainer.element
    });

    filmPresenter.init(film);
  }


  #renderFilmList() {
    if (this.#catalogFilms.length <= 0) {
      this.#renderNoFilms();
      return;
    }

    this.#renderFilms(0, Math.min(this.#catalogFilms.length, FILM_COUNT_PER_STEP));

    if (this.#catalogFilms.length > FILM_COUNT_PER_STEP) {
      this.#renderShowMoreButton();
    }
  }

  #renderFilms(from, to) {
    this.#catalogFilms
      .slice(from, to)
      .forEach((film) => this.#renderFilm(film, this.#commentsList));
  }

  #renderNoFilms() {
    render(this.#noFilmsComponent, this.#filmList.element, RenderPosition.AFTERBEGIN);
  }

  #renderShowMoreButton() {
    this.#showMoreButtonComponent = new ShowMoreButtonView({
      onClick: this.#handleShowMoreButtonClick
    });
    render(this.#showMoreButtonComponent, this.#filmList.element);
  }
}
