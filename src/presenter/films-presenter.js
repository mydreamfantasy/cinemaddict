import { FILM_COUNT_PER_STEP, SortType, TimeLimit, UpdateType, UserAction } from '../const.js';
import { render, RenderPosition, remove } from '../framework/render.js';
import FilmListContainerView from '../view/film-list-container-view.js';
import FilmListView from '../view/film-list-view.js';
import FilmSectionView from '../view/film-section-view.js';
import {filter} from '../utils/filter.js';
import HiddenTitleView from '../view/hidden-title-view.js';
import NoFilmsView from '../view/no-films-view.js';
import SortView from '../view/sort-view.js';
import FilmPresenter from './film-presenter.js';
import ShowMorePresenter from './show-more-presenter.js';
import StatisticView from '../view/statistic-view.js';
import LoadingView from '../view/loading-view.js';
import { sortByDate, sortByRating } from '../utils/utils.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';

export default class FilmsPresenter {
  #filmsContainer = null;
  #statisticContainer = null;
  #filmsModel = null;
  #commentsModel = null;
  #filterModel = null;
  #filmPresenter = new Map();

  #renderedFilmCount = FILM_COUNT_PER_STEP;
  #loadingComponent = new LoadingView();
  #filmSection = new FilmSectionView();
  #filmList = new FilmListView();
  #filmListContainer = new FilmListContainerView();

  #noFilmsComponent = null;
  #sortComponent = null;
  #showMorePresenter = null;
  #statisticComponent = null;

  #isLoading = true;
  #currentSortType = SortType.DEFAULT;
  #uiBlocker = new UiBlocker ({
    lowerLimit: TimeLimit.LOWER_LIMIT,
    upperLimit: TimeLimit.UPPER_LIMIT
  });


  constructor({filmsContainer, statisticContainer, filmsModel, commentsModel, filterModel}) {
    this.#filmsContainer = filmsContainer;
    this.#statisticContainer = statisticContainer;
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;
    this.#filterModel = filterModel;

    this.#filmsModel.addObserver(this.#handleModelEvent);
    this.#commentsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get films() {
    const filterType = this.#filterModel.filter;
    const films = this.#filmsModel.films;
    const filteredFilms = filter[filterType](films);

    switch (this.#currentSortType) {
      case SortType.DATE:
        return filteredFilms.sort(sortByDate);
      case SortType.RATING:
        return filteredFilms.sort(sortByRating);
      case SortType.DEFAULT:
        return filteredFilms;
      default:
        throw new Error('Unknown state!');
    }
  }

  init() {
    render(this.#filmSection, this.#filmsContainer);

    render(new HiddenTitleView(), this.#filmList.element);
    render(this.#filmListContainer, this.#filmList.element);
    this.#renderFilmList();
  }

  #handleSortTypeChange = (sortType) => {

    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearFilms({resetRenderedFilmCount: true});
    this.#renderFilmList();
  };

  #renderSort() {
    this.#sortComponent = new SortView({
      onSortTypeChange: this.#handleSortTypeChange,
      currentSortType: this.#currentSortType
    });

    render(this.#sortComponent, this.#filmsContainer, RenderPosition.AFTERBEGIN);
  }

  #renderStatisticView() {
    this.#statisticComponent = new StatisticView({
      filmsCount: this.#filmsModel.films.length
    });

    render(this.#statisticComponent, this.#statisticContainer);
  }

  #handleModeChange = () => {
    this.#filmPresenter.forEach((presenter) => presenter.resetView());
  };

  #handleViewAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block();
    // console.log(update)
    switch (actionType) {
      case UserAction.UPDATE_FILM:

        this.#filmPresenter.get(update.id).setSaving();
        try {
          await this.#filmsModel.updateFilm(updateType, update);
        } catch(err) {
          this.#filmPresenter.get(update.id).setAborting('updateFilm');
        }
        break;
      case UserAction.ADD_COMMENT:
        this.#filmPresenter.get(update.film.id).setSaving();
        try {
          // scrollTop;
          await this.#commentsModel.addComment(updateType, update);
        } catch(err) {
          this.#filmPresenter.get(update.film.id).setAborting('addComment');
        }
        break;
      case UserAction.DELETE_COMMENT:
        this.#filmPresenter.get(update.film.id).setDeleting();
        try {
          await this.#commentsModel.deleteComment(updateType, update);
        } catch(err) {
          this.#filmPresenter.get(update.film.id).setAborting('deleteComment');
        }
        break;
      default:
        throw new Error(`Unknown state!, ${actionType}`);
    }

    this.#uiBlocker.unblock();
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#filmPresenter.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearFilms();
        this.#renderFilmList();
        break;
      case UpdateType.MAJOR:
        this.#clearFilms({resetRenderedFilmCount: true, resetSortType: true});
        this.#renderFilmList();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderFilmList();
        break;
      default:
        throw new Error('Unknown state!');
    }
  };

  #renderNoFilms() {
    this.#noFilmsComponent = new NoFilmsView({
      filterType: this.#filterModel.filter
    });

    render(this.#noFilmsComponent, this.#filmList.element, RenderPosition.AFTERBEGIN);
  }

  #renderFilms = (films) => {
    films.forEach((film) => this.#renderFilm(film));
  };

  #renderFilm(film) {
    const filmPresenter = new FilmPresenter({
      filmListContainer: this.#filmListContainer.element,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange,
      currentFilterType: this.#filterModel.filter,
      commentsModel: this.#commentsModel
    });

    filmPresenter.init(film);
    this.#filmPresenter.set(film.id, filmPresenter);
  }

  #renderShowMoreButton() {
    this.#showMorePresenter = new ShowMorePresenter ({
      renderFilms: this.#renderFilms,
      filmList: this.#filmList.element,
      films: this.films
    });

    this.#showMorePresenter.init();
  }

  #renderLoading() {
    render(this.#loadingComponent, this.#filmList.element, RenderPosition.AFTERBEGIN);
  }

  #clearFilms({resetRenderedFilmCount = false, resetSortType = false} = {}) {
    const filmCount = this.films.length;

    this.#filmPresenter.forEach((presenter) => presenter.destroy());
    this.#filmPresenter.clear();

    remove(this.#sortComponent);
    remove(this.#noFilmsComponent);
    remove(this.#loadingComponent);
    remove(this.#statisticComponent);

    if(this.#showMorePresenter) {
      this.#showMorePresenter.destroy();
    }

    if (this.#noFilmsComponent) {
      remove(this.#noFilmsComponent);
    }

    if (resetRenderedFilmCount) {
      this.#renderedFilmCount = FILM_COUNT_PER_STEP;
    } else {
      this.#renderedFilmCount = Math.min(filmCount, this.#renderedFilmCount);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DEFAULT;
    }
  }

  #renderFilmList() {
    render(this.#filmList, this.#filmSection.element);

    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    const filmCount = this.films.length;
    const films = this.films;

    if (filmCount === 0) {
      this.#renderNoFilms();
      return;
    }

    this.#renderSort();

    this.#renderFilms(films.slice(0, Math.min(filmCount, this.#renderedFilmCount)));

    if (filmCount > this.#renderedFilmCount) {
      this.#renderShowMoreButton();
    }
    this.#renderStatisticView();
  }
}
