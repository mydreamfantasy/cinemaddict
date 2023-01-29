import { UpdateType, UserAction } from '../const.js';
import { render, replace, remove } from '../framework/render.js';
import { isEscapeEvent } from '../utils/utils.js';
import CardView from '../view/card-view.js';
import FilmPopupView from '../view/film-popup-view.js';


const Mode = {
  DEFAULT: 'DEFAULT',
  OPEN: 'OPEN',
};

export default class FilmPresenter {
  #filmListContainer = null;

  #filmComponent = null;
  #filmPopup = null;

  #film = null;
  #handleDataChange = null;
  #handleModeChange = null;
  #currentFilterType = null;
  #commentsModel = null;
  #mode = Mode.DEFAULT;


  constructor({filmListContainer, onDataChange, onModeChange, currentFilterType, commentsModel}) {
    this.#filmListContainer = filmListContainer;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
    this.#currentFilterType = currentFilterType;
    this.#commentsModel = commentsModel;
  }

  init(film) {
    this.#film = film;

    const prevFilmComponent = this.#filmComponent;
    const prevPopupComponent = this.#filmPopup;

    this.#filmComponent = new CardView({
      film: this.#film,
      onOpenClick: () => this.#openPopupClickHandler(this.#film),
      onControlsClick: this.#handleControlsClick,
      currentFilterType: this.#currentFilterType,
    });

    if (prevFilmComponent === null) {
      render(this.#filmComponent, this.#filmListContainer);
    } else {
      replace(this.#filmComponent, prevFilmComponent);
    }

    if (this.#mode === Mode.OPEN) {
      this.#filmPopup = new FilmPopupView({
        film: film,
        comments: this.#commentsModel.comments,
        onCloseClick: () => this.#closePopupClickHandler(film),
        onControlsClick: this.#handleControlsClick,
        currentFilterType: this.#currentFilterType,
        onDeleteClick: this.#handleDeleteClick,
        onAddComment: this.#handleAddComment,

      });
      replace(this.#filmPopup, prevPopupComponent);
      // this.#mode = Mode.DEFAULT;
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
      this.#closePopupClickHandler();
    }
  }

  setSaving() {
    if (this.#mode === Mode.OPEN) {
      this.#filmPopup.updateElement({
        isDisabled: true,
        // isSaving: true,
      });
    }
  }

  setDeleting() {
    if (this.#mode === Mode.OPEN) {
      this.#filmPopup.updateElement({
        isDisabled: true,
        isDeleting: true,
      });
    }
  }

  #handleControlsClick = (updatedDetails, updateType = UpdateType.PATCH) => {
    this.#handleDataChange(
      UserAction.UPDATE_FILM,
      updateType,
      {...this.#film, userDetails: updatedDetails});
  };

  async #openPopupClickHandler(film) {
    await this.#commentsModel.init(film.id);
    this.#filmPopup = new FilmPopupView({
      film: film,
      comments: this.#commentsModel.comments,
      onCloseClick: () => this.#closePopupClickHandler(film),
      onControlsClick: this.#handleControlsClick,
      currentFilterType: this.#currentFilterType,
      onDeleteClick: this.#handleDeleteClick,
      onAddComment: this.#handleAddComment
    });
    this.#appendPopup();
  }

  #appendPopup() {
    this.#handleModeChange();
    document.body.appendChild(this.#filmPopup.element);
    document.body.classList.add('hide-overflow');
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.OPEN;
  }

  #removePopup() {
    document.body.removeChild(this.#filmPopup.element);
    document.body.classList.remove('hide-overflow');
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  }

  #closePopupClickHandler = () => {
    this.#removePopup();
  };

  #escKeyDownHandler = (evt) => {
    if (isEscapeEvent(evt)) {
      evt.preventDefault();
      this.#closePopupClickHandler();
    }
  };

  #handleDeleteClick = (id) => {
    this.#handleDataChange(
      UserAction.DELETE_COMMENT,
      UpdateType.PATCH,
      id
    );
  };

  #handleAddComment = (data) => {
    this.#handleDataChange(
      UserAction.ADD_COMMENT,
      UpdateType.PATCH,
      data
    );
  };
}
