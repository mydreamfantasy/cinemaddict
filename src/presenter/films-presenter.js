import { FILM_COUNT_PER_STEP } from '../const.js';
import {render} from '../framework/render.js';
import { isEscapeEvent } from '../utils/utils.js';
import CardView from '../view/card-view.js';
import FilmsExtraCommentedView from '../view/films-extra-commentend-view.js';
import FilmListContainerView from '../view/film-list-container-view.js';
import FilmListView from '../view/film-list-view.js';
import FilmPopupView from '../view/film-popup-view.js';
import FilmSectionView from '../view/film-section-view.js';
import FilmsExtraRatedContainerView from '../view/films-extra-rated-container-view.js';
import FilmsExtraRatedView from '../view/films-extra-rated-view.js';
import FilmsRatedTitleView from '../view/films-rated-title-view.js';
import HiddenTitleView from '../view/hidden-title-view.js';
import NoFilmsView from '../view/no-films-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import TopCommentView from '../view/top-comment-view.js';
import TopRatedView from '../view/top-rated-view.js';
import FilmsCommentedTitleView from '../view/films-commented-title-view.js';
import FilmsExtraCommentedContainerView from '../view/films-extra-commented-container.js';

export default class FilmsPresenter {
  #filmsContainer = null;
  #filmsModel = null;
  #commentsModel = null;
  #topCommentedModel = null;
  #topRatedModel = null;
  #showMoreButtonComponent = null;
  #catalogFilms = [];
  #commentsList = [];
  #topRatedFilms = [];
  #topCommentedFilms = [];

  #renderedFilmCount = FILM_COUNT_PER_STEP;
  #filmSection = new FilmSectionView();
  #filmList = new FilmListView();
  #filmListContainer = new FilmListContainerView();
  #filmsExtraRated = new FilmsExtraRatedView();
  #filmsExtraCommented = new FilmsExtraCommentedView();
  #filmsExtraRatedContainer = new FilmsExtraRatedContainerView();
  #filmsExtraCommentedContainer = new FilmsExtraCommentedContainerView();

  constructor({filmsContainer, filmsModel, commentsModel, topCommentedModel, topRatedModel}) {
    this.#filmsContainer = filmsContainer;
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;
    this.#topCommentedModel = topCommentedModel;
    this.#topRatedModel = topRatedModel;
  }

  init() {
    this.#catalogFilms = [...this.#filmsModel.films];
    this.#commentsList = [...this.#commentsModel.comments];
    this.#topRatedFilms = [...this.#topRatedModel.films];
    this.#topCommentedFilms = [...this.#topCommentedModel.films];
    render(this.#filmSection, this.#filmsContainer);
    render(this.#filmList, this.#filmSection.element);
    render(new HiddenTitleView(), this.#filmList.element);
    render(this.#filmListContainer, this.#filmList.element);

    this.#renderFilmList();

    render(this.#filmsExtraRated, this.#filmSection.element);
    render(new FilmsRatedTitleView(), this.#filmsExtraRated.element);
    render(this.#filmsExtraRatedContainer, this.#filmsExtraRated.element);
    render(this.#filmsExtraCommented, this.#filmSection.element);
    render(new FilmsCommentedTitleView(), this.#filmsExtraCommented.element);
    render(this.#filmsExtraCommentedContainer, this.#filmsExtraCommented.element);

    this.#topRatedFilms.forEach((film) => {
      render(new TopRatedView({film}), this.#filmsExtraRatedContainer.element);
    });
    this.#topCommentedFilms.forEach((film) => {
      render(new TopCommentView({film}), this.#filmsExtraCommentedContainer.element);
    });
  }

  #handleShowMoreButtonClick = () => {
    this.#catalogFilms
      .slice(this.#renderedFilmCount, this.#renderedFilmCount + FILM_COUNT_PER_STEP)
      .forEach((film) => this.#renderFilm(film));

    this.#renderedFilmCount += FILM_COUNT_PER_STEP;

    if (this.#renderedFilmCount >= this.#catalogFilms.length) {
      this.#showMoreButtonComponent.element.remove();
      this.#showMoreButtonComponent.removeElement();
    }
  };

  #renderFilm(film) {

    const escKeyDownHandler = (evt) => {
      if (isEscapeEvent(evt)) {
        evt.preventDefault();
        onClose();
      }
    };

    function onClose() {
      removePopup();
      document.removeEventListener('keydown', escKeyDownHandler);
    }

    const closeButtonHandler = () => onClose();

    const filmPopup = new FilmPopupView({
      film,
      comments: this.#commentsList,
      onCloseClick: closeButtonHandler,
    });

    const filmComponent = new CardView({
      film,
      onOpenClick: appendPopup
    });

    function appendPopup() {
      document.body.appendChild(filmPopup.element);
      document.body.classList.add('hide-overflow');
      document.addEventListener('keydown', escKeyDownHandler);
    }

    function removePopup() {
      document.body.removeChild(filmPopup.element);
      document.body.classList.remove('hide-overflow');
      document.removeEventListener('keydown', escKeyDownHandler);
    }

    render(filmComponent, this.#filmListContainer.element);
  }

  #renderFilmList() {
    if (this.#catalogFilms.length <= 0)
    {
      render(new NoFilmsView(), this.#filmList.element);
    }
    for (let i = 0; i < Math.min(this.#catalogFilms.length, FILM_COUNT_PER_STEP); i++) {
      this.#renderFilm(this.#catalogFilms[i]);
    }

    if (this.#catalogFilms.length > FILM_COUNT_PER_STEP) {
      this.#showMoreButtonComponent = new ShowMoreButtonView({
        onClick: this.#handleShowMoreButtonClick
      });
      render(this.#showMoreButtonComponent, this.#filmList.element);
    }

  }
}
