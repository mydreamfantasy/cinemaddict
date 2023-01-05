import { render, replace, remove } from '../framework/render.js';
import { isEscapeEvent } from '../utils/utils.js';
import CardView from '../view/card-view.js';
import FilmPopupView from '../view/film-popup-view.js';


const Mode = {
  DEFAULT: 'DEFAULT',
  OPENING: 'OPENING',
};

export default class FilmPresenter {
  #filmListContainer = null;
  #commentsList = null;

  #filmComponent = null;
  #filmPopup = null;

  #film = null;
  #handleDataChange = null;
  #handleModeChange = null;
  #mode = Mode.DEFAULT;


  constructor({filmListContainer, onDataChange, onModeChange}) {
    this.#filmListContainer = filmListContainer;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
  }

  init(film, comments) {
    this.#film = film;
    this.#commentsList = comments;


    const prevFilmComponent = this.#filmComponent;
    const prevFilmPopup = this.#filmPopup;

    this.#filmComponent = new CardView({
      film: this.#film,
      onOpenClick: () => this.#openFilmPopupHandler(this.#film, this.#commentsList),
      onWatchlistClick: this.#handleWatchlistClick,
      onHistoryClick: this.#handleHistoryClick,
      onFavoriteClick: this.#handleFavoriteClick
    });

    if (prevFilmComponent === null || prevFilmPopup === null) {
      render(this.#filmComponent, this.#filmListContainer);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#filmComponent, prevFilmComponent);
    }

    if (this.#mode === Mode.OPENING) {
      replace(this.#filmPopup, prevFilmPopup);
    }

    remove(prevFilmComponent);
    remove(prevFilmPopup);
  }

  destroy() {
    remove(this.#filmComponent);
    remove(this.#filmPopup);
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#onCloseHandler();
    }
  }

  #handleWatchlistClick = () => {
    this.#handleDataChange({...this.#film, watchlist: !this.#film.userDetails.watchlist});
  };

  #handleFavoriteClick = () => {
    this.#handleDataChange({...this.#film, favorite: !this.#film.userDetails.favorite});
  };

  #handleHistoryClick = () => {
    this.#handleDataChange({...this.#film, alreadyWatched: !this.#film.userDetails.alreadyWatched});
  };

  #openFilmPopupHandler(film, comments) {
    this.#filmPopup = new FilmPopupView({
      film: film,
      comments: comments,
      onCloseClick:() => this.#onCloseHandler(film),
    });
    this.#appendPopup();
  }

  #appendPopup() {
    document.body.appendChild(this.#filmPopup.element);
    document.body.classList.add('hide-overflow');
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#handleModeChange();
    this.#mode = Mode.OPENING;
  }

  #removePopup() {
    document.body.removeChild(this.#filmPopup.element);
    document.body.classList.remove('hide-overflow');
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  }

  #onCloseHandler = () => {
    this.#removePopup();
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #escKeyDownHandler = (evt) => {
    if (isEscapeEvent(evt)) {
      evt.preventDefault();
    }
    this.#onCloseHandler();
  };
}
