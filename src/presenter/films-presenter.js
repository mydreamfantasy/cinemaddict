import { FILM_COUNT_PER_STEP } from '../const.js';
import { render, RenderPosition } from '../framework/render.js';
import FilmListContainerView from '../view/film-list-container-view.js';
import FilmListView from '../view/film-list-view.js';
import FilmSectionView from '../view/film-section-view.js';
import FiltersView from '../view/filters-view.js';
import HiddenTitleView from '../view/hidden-title-view.js';
import NoFilmsView from '../view/no-films-view.js';
import SortView from '../view/sort-view.js';
import FilmPresenter from './film-presenter.js';
import ShowMorePresenter from './show-more-presenter.js';

export default class FilmsPresenter {
  #filmsContainer = null;
  #filmsModel = null;
  #commentsModel = null;
  #filters = null;

  #catalogFilms = [];
  #commentsList = [];

  #filmSection = new FilmSectionView();
  #filmList = new FilmListView();
  #filmListContainer = new FilmListContainerView();
  #noFilmsComponent = new NoFilmsView();
  #sortComponent = new SortView();

  constructor({filmsContainer, filmsModel, commentsModel, filters}) {
    this.#filmsContainer = filmsContainer;
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;
    this.#filters = filters;
  }

  init() {
    this.#catalogFilms = [...this.#filmsModel.films];
    this.#commentsList = [...this.#commentsModel.comments];
    render(this.#filmSection, this.#filmsContainer);
    render(this.#filmList, this.#filmSection.element);
    render(new HiddenTitleView(), this.#filmList.element);
    render(this.#filmListContainer, this.#filmList.element);

    this.#renderSort();
    this.#renderFilters(this.#filters);

    this.#renderFilmList();
  }

  #renderFilters(filters) {
    render(new FiltersView({filters}), this.#filmsContainer, RenderPosition.AFTERBEGIN);
  }

  #renderSort() {
    render(this.#sortComponent, this.#filmsContainer, RenderPosition.AFTERBEGIN);
  }

  #renderFilm(film, comments) {

    const filmPresenter = new FilmPresenter({
      filmListContainer: this.#filmListContainer.element
    });

    filmPresenter.init(film, comments);
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
    const showMorePresenter = new ShowMorePresenter ({
      renderFilms: this.#renderFilms,
      filmList: this.#filmList.element,
      catalogFilms: this.#catalogFilms
    });

    showMorePresenter.init();
  }
}
