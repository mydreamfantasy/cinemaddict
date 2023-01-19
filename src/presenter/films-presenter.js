import { FILM_COUNT_PER_STEP, SortType, UpdateType, UserAction } from '../const.js';
import { render, RenderPosition, remove } from '../framework/render.js';
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

  // #catalogFilms = [];
  #commentsList = [];

  #filmSection = new FilmSectionView();
  #filmList = new FilmListView();
  #filmListContainer = new FilmListContainerView();
  #noFilmsComponent = new NoFilmsView();
  #sortComponent = null;
  #showMorePresenter = null;
  #currentSortType = SortType.DEFAULT;
  // #sourcedFilms = [];


  constructor({filmsContainer, filmsModel, commentsModel, filters}) {
    this.#filmsContainer = filmsContainer;
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;
    this.#filters = filters;
    this.#filmsModel.addObserver(this.#handleModelEvent);
  }

  get films() {
    switch (this.#currentSortType) {
      case SortType.DATE:
        return [...this.#filmsModel.films].sort((filmA, filmB) => filmB.filmInfo.year - filmA.filmInfo.year);
      case SortType.RATING:
        return [...this.#filmsModel.films].sort((filmA, filmB) => filmB.filmInfo.rating - filmA.filmInfo.rating);
      default:
        return this.#filmsModel.films;
    }
  }

  get comments() {
    return this.#commentsModel.comments;
  }

  init() {
    this.#commentsList = [...this.#commentsModel.comments];
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

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
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
    this.#filmPresenter.get(updatedFilm.id).init(updatedFilm);
  };

  #handleModeChange = () => {
    this.#filmPresenter.forEach((presenter) => presenter.resetView());
  };

  #renderFilm(film) {
    const filmPresenter = new FilmPresenter({
      filmListContainer: this.#filmListContainer.element,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange,
      comments: this.#commentsList,
    });

    filmPresenter.init(film);
    this.#filmPresenter.set(film.id, filmPresenter);
  }

  #renderFilmList() {
    const filmCount = this.films.length;
    const films = this.films.slice(0, Math.min(filmCount, FILM_COUNT_PER_STEP));

    if (this.films.length === 0) {
      this.#renderNoFilms();
      return;
    }

    this.#renderFilms(films);

    if (filmCount > FILM_COUNT_PER_STEP) {
      this.#renderShowMoreButton();
    }
  }

  #renderFilms = (films) => {
    films.forEach((film) => this.#renderFilm(film));
  };

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_FILM:
        this.#filmsModel.updateFilm(updateType, update);
        break;
      case UserAction.ADD_FILM:
        this.#filmsModel.addFilm(updateType, update);
        break;
      case UserAction.DELETE_FILM:
        this.#filmsModel.deleteFilm(updateType, update);
        break;
      default:
        throw new Error('Unknown state!');
    }
  };

  #handleModelEvent = (updateType, data) => {
    // console.log(updateType, data);

    switch (updateType) {
      case UpdateType.PATCH:
        // - обновить часть списка
        this.#filmPresenter.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        // - обновить список (например, когда фильму добавлен контрол)
        break;
      case UpdateType.MAJOR:
        // - обновить весь список(например, при переключении фильтра)
        break;
    }
  };

  #renderNoFilms() {
    render(this.#noFilmsComponent, this.#filmList.element, RenderPosition.AFTERBEGIN);
  }

  #renderShowMoreButton() {
    this.#showMorePresenter = new ShowMorePresenter ({
      renderFilms: this.#renderFilms,
      filmList: this.#filmList.element,
      films: this.films
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
