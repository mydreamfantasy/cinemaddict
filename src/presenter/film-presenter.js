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
    const prevPopupComponent = this.#filmPopup;

    this.#filmComponent = new CardView({
      film: this.#film,
      onOpenClick: () => this.#openFilmPopupHandler(this.#film, this.#commentsList),
      onWatchlistClick: this.#handleWatchlistClick,
      onHistoryClick: this.#handleHistoryClick,
      onFavoriteClick: this.#handleFavoriteClick
    });

    if(prevFilmComponent === null) {
      render(this.#filmComponent, this.#filmListContainer);
    } else {
      replace(this.#filmComponent, prevFilmComponent);
    }

    if(this.#mode === Mode.OPENING) {
      replace(this.#filmPopup, prevPopupComponent);
    }

    remove(prevFilmComponent);
    remove(prevPopupComponent);
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
    this.#handleDataChange({...this.#film,
      userDetails: {...this.#film.userDetails, watchlist: !this.#film.userDetails.watchlist}});
  };

  #handleHistoryClick = () => {
    this.#handleDataChange({...this.#film,
      userDetails: {...this.#film.userDetails, alreadyWatched: !this.#film.userDetails.alreadyWatched}});
  };

  #handleFavoriteClick = () => {
    this.#handleDataChange({...this.#film,
      userDetails: {...this.#film.userDetails, favorite: !this.#film.userDetails.favorite}});
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
