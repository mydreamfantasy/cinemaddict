import { filter } from '../utils/filter.js';
import SortView from '../view/sort-view.js';
import FilmPresenter from './film-presenter.js';
import LoadingView from '../view/loading-view.js';
import NoFilmsView from '../view/no-films-view.js';
import FilmListView from '../view/film-list-view.js';
import StatisticView from '../view/statistic-view.js';
import RankUserPresenter from './rank-user-presenter.js';
import ShowMorePresenter from './show-more-presenter.js';
import HiddenTitleView from '../view/hidden-title-view.js';
import FilmSectionView from '../view/film-section-view.js';
import { sortByDate, sortByRating } from '../utils/utils.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';
import NoFilmsErrorView from '../view/no-films-error-view.js';
import { render, RenderPosition, remove } from '../framework/render.js';
import FilmListContainerView from '../view/film-list-container-view.js';
import { FILM_COUNT_PER_STEP, SortType, TimeLimit, UpdateType, UserAction } from '../const.js';

export default class FilmsPresenter {
  #filmsContainer = null;
  #statisticContainer = null;
  #rankUserContainer = null;
  #filmsModel = null;
  #commentsModel = null;
  #filterModel = null;
  #filmPresenter = new Map();

  #renderedFilmCount = FILM_COUNT_PER_STEP;
  #loadingComponent = new LoadingView();
  #noFilmsErrorComponent = new NoFilmsErrorView();
  #filmSection = new FilmSectionView();
  #filmList = new FilmListView();
  #filmListContainer = new FilmListContainerView();

  #noFilmsComponent = null;
  #sortComponent = null;
  #statisticComponent = null;
  #showMorePresenter = null;
  #rankUserPresenter = null;

  #isLoading = true;
  #currentSortType = SortType.DEFAULT;
  #uiBlocker = new UiBlocker ({
    lowerLimit: TimeLimit.LOWER_LIMIT,
    upperLimit: TimeLimit.UPPER_LIMIT
  });

  constructor({rankContainer, filmsContainer, statisticContainer, filmsModel, commentsModel, filterModel}) {
    this.#rankUserContainer = rankContainer;
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

  #renderLoading() {
    render(this.#loadingComponent, this.#filmList.element, RenderPosition.AFTERBEGIN);
  }

  #renderNoFilmsError() {
    render(this.#noFilmsErrorComponent, this.#filmList.element, RenderPosition.AFTERBEGIN);
  }

  #renderRankUser() {
    this.#rankUserPresenter = new RankUserPresenter ({
      rankUserContainer: this.#rankUserContainer,
      filmsModel: this.#filmsModel
    });

    this.#rankUserPresenter.init();
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

  #handleModeChange = () => {
    this.#filmPresenter.forEach((presenter) => presenter.resetView());
  };

  #handleViewAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block();

    switch (actionType) {
      case UserAction.UPDATE_FILM:

        this.#filmPresenter.get(update.film.id).setSaving();
        try {
          await this.#filmsModel.updateFilm(updateType, update);
        } catch(err) {
          this.#filmPresenter.get(update.film.id).setAborting(UserAction.UPDATE_FILM);
        }
        break;
      case UserAction.ADD_COMMENT:
        this.#filmPresenter.get(update.film.id).setSaving();
        try {
          await this.#commentsModel.addComment(updateType, update);
        } catch(err) {
          this.#filmPresenter.get(update.film.id).setAborting(UserAction.ADD_COMMENT);
        }
        break;
      case UserAction.DELETE_COMMENT:
        this.#filmPresenter.get(update.film.id).setDeleting(update.id);
        try {
          await this.#commentsModel.deleteComment(updateType, update);
        } catch(err) {
          this.#filmPresenter.get(update.film.id).setAborting(UserAction.DELETE_COMMENT, update.id);
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
        this.#filmPresenter.get(data.film.id).init(data.film, data?.scroll);
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
      case UpdateType.INIT_ERROR:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderNoFilmsError();
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

  #renderStatisticView() {
    this.#statisticComponent = new StatisticView({
      filmsCount: this.#filmsModel.films.length
    });

    render(this.#statisticComponent, this.#statisticContainer);
  }

  #clearFilms({resetRenderedFilmCount = false, resetSortType = false} = {}) {
    const filmCount = this.films.length;

    this.#filmPresenter.forEach((presenter) => presenter.destroy());
    this.#filmPresenter.clear();

    remove(this.#sortComponent);
    remove(this.#noFilmsComponent);
    remove(this.#loadingComponent);
    remove(this.#statisticComponent);

    if(this.#rankUserPresenter) {
      this.#rankUserPresenter.destroy();
    }

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

    this.#renderRankUser();
    this.#renderSort();

    this.#renderFilms(films.slice(0, Math.min(filmCount, this.#renderedFilmCount)));

    if (filmCount > this.#renderedFilmCount) {
      this.#renderShowMoreButton();
    }
    this.#renderStatisticView();
  }
}
