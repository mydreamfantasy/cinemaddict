import {render} from '../framework/render.js';
import { isEscapeEvent } from '../utils.js';
import CardView from '../view/card-view.js';
import FilmListContainerView from '../view/film-list-container-view.js';
import FilmListView from '../view/film-list-view.js';
import FilmPopupView from '../view/film-popup-view.js';
import FilmSectionView from '../view/film-section-view.js';
import HiddenTitleView from '../view/hidden-title-view.js';
import NoFilmsView from '../view/no-films-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';

const FILM_COUNT_PER_STEP = 5;

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
    // const filmComponent = new CardView({film});
    // const filmPopup = new FilmPopupView({film, comments: this.#commentsList});

    const escKeyDownHandler = (evt) => {
      if (isEscapeEvent) {
        evt.preventDefault();
        removePopup.call(this);
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const closeButtonHandler = () => {
      removePopup.call(this);
      filmPopup.element.querySelector('.film-details__close-btn').removeEventListener('click', closeButtonHandler);
    };

    const filmPopup = new FilmPopupView({
      film,
      comments: this.#commentsList,
      onCloseClick: () => {
        closeButtonHandler;
      }
    });

    const filmComponent = new CardView({
      film,
      onOpenClick: () => {
        appendPopup.call(this);
        filmPopup;
      }
    });

    const appendPopup = () => {
      document.body.appendChild(filmPopup.element);
      document.body.classList.add('hide-overflow');
    };

    const removePopup = () => {
      document.body.removeChild(filmPopup.element);
      document.body.classList.remove('hide-overflow');
    };

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
