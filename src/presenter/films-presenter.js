import {render} from '../render.js';
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

  #showMoreButtonClickHandler = (evt) => {
    evt.preventDefault();
    this.#catalogFilms
      .slice(this.#renderedFilmCount, this.#renderedFilmCount + FILM_COUNT_PER_STEP)
      .forEach((film) => this.#renderFilms(film));

    this.#renderedFilmCount += FILM_COUNT_PER_STEP;

    if (this.#renderedFilmCount >= this.#catalogFilms.length) {
      this.#showMoreButtonComponent.element.remove();
      this.#showMoreButtonComponent.removeElement();
    }
  };

  #renderFilms(film) {
    const filmComponent = new CardView({film});
    const filmPopup = new FilmPopupView({film, comments: this.#commentsList});

    const appendPopup = () => document.body.appendChild(filmPopup.element);
    const removePopup = () => document.body.removeChild(filmPopup.element);

    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        removePopup();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const closeButtonHandler = () => removePopup();

    filmComponent.element.addEventListener('click', () => {
      appendPopup();
      filmPopup.element.querySelector('.film-details__close-btn').addEventListener('click', closeButtonHandler);
      document.addEventListener('keydown', escKeyDownHandler);
    });

    render(filmComponent, this.#filmListContainer.element);
  }

  #renderFilmList() {
    if (this.#catalogFilms.length <= 0)
    {
      render(new NoFilmsView(), this.#filmList.element);
    } else {
      for (let i = 0; i < Math.min(this.#catalogFilms.length, FILM_COUNT_PER_STEP); i++) {
        this.#renderFilms(this.#catalogFilms[i]);
      }

      if (this.#catalogFilms.length > FILM_COUNT_PER_STEP) {
        this.#showMoreButtonComponent = new ShowMoreButtonView();
        render(this.#showMoreButtonComponent, this.#filmList.element);

        this.#showMoreButtonComponent.element.addEventListener('click', this.#showMoreButtonClickHandler);
      }
    }
  }
}
