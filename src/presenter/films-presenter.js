import { FILM_COUNT_PER_STEP, SortType } from '../const.js';
import { render, RenderPosition, remove } from '../framework/render.js';
import { updateItem } from '../utils/utils.js';
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
  #filmPresenter = new Map();

  #catalogFilms = [];
  #commentsList = [];

  #filmSection = new FilmSectionView();
  #filmList = new FilmListView();
  #filmListContainer = new FilmListContainerView();
  #noFilmsComponent = new NoFilmsView();
  #sortComponent = null;
  #showMorePresenter = null;
  #currentSortType = SortType.DEFAULT;
  #sourcedFilms = [];


  constructor({filmsContainer, filmsModel, commentsModel, filters}) {
    this.#filmsContainer = filmsContainer;
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;
    this.#filters = filters;
  }

  init() {
    this.#catalogFilms = [...this.#filmsModel.films];
    this.#commentsList = [...this.#commentsModel.comments];
    this.#sourcedFilms = [...this.#filmsModel.films];
    render(this.#filmSection, this.#filmsContainer);
    this.#renderFilters(this.#filters);
    this.#renderSort();
    render(this.#filmList, this.#filmSection.element);
    render(new HiddenTitleView(), this.#filmList.element);
    render(this.#filmListContainer, this.#filmList.element);


    this.#renderFilmList();
  }

  #renderFilters(filters) {
    render(new FiltersView({filters}), this.#filmsContainer, RenderPosition.BEFOREBEGIN);
  }

  #sortFilms(sortType) {
    switch (sortType) {
      case SortType.DATE:
        this.#catalogFilms.sort((filmA, filmB) => filmB.filmInfo.year - filmA.filmInfo.year);
        break;
      case SortType.RATING:
        this.#catalogFilms.sort((filmA, filmB) => filmB.filmInfo.rating - filmA.filmInfo.rating);
        break;
      case SortType.DEFAULT:
        this.#catalogFilms = [...this.#sourcedFilms];
        break;
      default:
        throw new Error('Unknown state!');
    }
    this.#currentSortType = sortType;
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortFilms(sortType);
    this.#clearFilmList();
    this.#renderFilmList();
    this.#renderSort();
  };

  #renderSort() {
    this.#sortComponent = new SortView({
      onSortTypeChange: this.#handleSortTypeChange,
      currentSortType: this.#currentSortType
    });

    render(this.#sortComponent, this.#filmsContainer, RenderPosition.BEFOREBEGIN);
  }

  #handleFilmChange = (updatedFilm) => {
    this.#catalogFilms = updateItem(this.#catalogFilms, updatedFilm);
    this.#sourcedFilms = updateItem(this.#sourcedFilms, updatedFilm);
    this.#filmPresenter.get(updatedFilm.id).init(updatedFilm);
  };

  #handleModeChange = () => {
    this.#filmPresenter.forEach((presenter) => presenter.resetView());
  };

  #renderFilm(film) {
    const filmPresenter = new FilmPresenter({
      filmListContainer: this.#filmListContainer.element,
      onDataChange: this.#handleFilmChange,
      onModeChange: this.#handleModeChange,
      comments: this.#commentsList
    });

    filmPresenter.init(film);
    this.#filmPresenter.set(film.id, filmPresenter);
  }

  #renderFilmList() {
    if (this.#catalogFilms.length === 0) {
      this.#renderNoFilms();
      return;
    }

    this.#renderFilms(0, Math.min(this.#catalogFilms.length, FILM_COUNT_PER_STEP));

    if (this.#catalogFilms.length > FILM_COUNT_PER_STEP) {
      this.#renderShowMoreButton();
    }
  }

  #renderFilms = (from, to) => {
    this.#catalogFilms
      .slice(from, to)
      .forEach((film) => this.#renderFilm(film));
  };

  #renderNoFilms() {
    render(this.#noFilmsComponent, this.#filmList.element, RenderPosition.AFTERBEGIN);
  }

  #renderShowMoreButton() {
    this.#showMorePresenter = new ShowMorePresenter ({
      renderFilms: this.#renderFilms,
      filmList: this.#filmList.element,
      maxFilmsAmount: this.#catalogFilms.length
    });

    this.#showMorePresenter.init();
  }

  #clearFilmList() {
    this.#filmPresenter.forEach((presenter) => presenter.destroy());
    this.#filmPresenter.clear();
    this.#showMorePresenter.destroy();
    remove(this.#sortComponent);

  }
}
