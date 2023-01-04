import { render } from '../framework/render.js';
import { isEscapeEvent } from '../utils/utils.js';
import CardView from '../view/card-view.js';
import FilmPopupView from '../view/film-popup-view.js';

export default class FilmPresenter {
  #filmListContainer = null;
  #commentsList = null;

  #filmComponent = null;
  #filmPopup = null;


  #film = null;

  constructor({filmListContainer}) {
    this.#filmListContainer = filmListContainer;
  }

  init(film, comments) {
    this.#film = film;
    this.#commentsList = comments;

    this.#filmComponent = new CardView({
      film: this.#film,
      onOpenClick: this.#openFilmPopupHandler(this.#film, this.#commentsList)
    });

    render(this.#filmComponent, this.#filmListContainer);
  }

  #openFilmPopupHandler(film, comments) {
    this.#filmPopup = new FilmPopupView({
      film: film,
      comments: comments,
      onCloseClick: this.#closeButtonHandler,
    });

    this.#appendPopup();
  }

  #appendPopup() {
    document.body.appendChild(this.#filmPopup);
    document.body.classList.add('hide-overflow');
    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  #removePopup() {
    document.body.removeChild(this.#filmPopup);
    document.body.classList.remove('hide-overflow');
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #escKeyDownHandler(evt) {
    if (isEscapeEvent(evt)) {
      evt.preventDefault();
      this.#onClose();
    }
  }

  #onClose() {
    this.#removePopup();
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #closeButtonHandler() {
    this.#onClose();
  }
}
