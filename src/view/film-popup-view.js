import { EMOJI, UpdateType, FilterType } from '../const.js';
import he from 'he';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { getTimeFromMins, humanizeReleaseDate, isCtrlEnterEvent } from '../utils/utils.js';

const createCommentTemplate = (comments, isDeleting, isDisabled) => comments.map((comment) => `
  <li class="film-details__comment">
    <span class="film-details__comment-emoji">
      <img src="./images/emoji/${comment.emotion}.png" width="55" height="55" alt="emoji-smile">
    </span>
    <div>
      <p class="film-details__comment-text">${comment.comment}</p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author">${comment.author}</span>
        <span class="film-details__comment-day">${humanizeReleaseDate(comment.date)}</span>
        <button class="film-details__comment-delete" data-id="${comment.id}" ${isDisabled ? 'disabled' : ''}>
        ${isDeleting ? 'Deleting...' : 'Delete'}
        </button>
      </p>
    </div>
  </li>
`).join('');

const createNewCommentTemplate = (currentEmotion) => EMOJI.map((emotion) => (`

    <input
      class="film-details__emoji-item visually-hidden"
      name="comment-emoji"
      type="radio"
      id="emoji-${emotion}" value="${emotion}"
      ${currentEmotion === emotion ? 'checked' : ''}
      >
    <label
      class="film-details__emoji-label"
      for="emoji-${emotion}">
        <img src="./images/emoji/${emotion}.png" width="30" height="30" alt="emoji">
    </label>
  `)).join('');

const createFilmPopupTemplate = (film, filmComments, state) => {
  const {emotion, comment, isDeleting, isDisabled} = state;


  const {
    title,
    alternativeTitle,
    totalRating,
    ageRating,
    duration,
    genre,
    poster,
    director,
    writers,
    actors,
    description,
    release
  } = film.filmInfo;

  const {
    watchlist,
    alreadyWatched,
    favorite
  } = film.userDetails;


  const { date, releaseCountry} = release;


  const activeWatchlistClassName = watchlist ? 'film-details__control-button--active' : '';
  const activeAsWatchedClassName = alreadyWatched ? 'film-details__control-button--active' : '';
  const activeFavoriteClassName = favorite ? 'film-details__control-button--active' : '';

  const commentTemplate = createCommentTemplate(filmComments, isDeleting, isDisabled);
  const newCommentTemplate = createNewCommentTemplate(emotion, isDisabled);

  return (
    `
    <section class="film-details">
      <div class="film-details__inner">
        <div class="film-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src="${poster}" alt="">

              <p class="film-details__age">${ageRating}+</p>
            </div>

            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${title}</h3>
                  <p class="film-details__title-original">Original: ${alternativeTitle}</p>
                </div>

                <div class="film-details__rating">
                  <p class="film-details__total-rating">${totalRating}</p>
                </div>
              </div>

              <table class="film-details__table">
                <tr class="film-details__row">
                  <td class="film-details__term">Director</td>
                  <td class="film-details__cell">${director}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Writers</td>
                  <td class="film-details__cell">${writers.join(', ')}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Actors</td>
                  <td class="film-details__cell">${actors.join(', ')}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Release Date</td>
                  <td class="film-details__cell">${humanizeReleaseDate(date)}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Duration</td>
                  <td class="film-details__cell">${getTimeFromMins(duration)}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Country</td>
                  <td class="film-details__cell">${releaseCountry}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Genres</td>
                  <td class="film-details__cell">
                    <span class="film-details__genre">${genre.join(', ')}</span>
                </td>
                </tr>
              </table>

              <p class="film-details__film-description">${description}</p>
            </div>
          </div>

          <section class="film-details__controls">
            <button type="button"
              class="film-details__control-button film-details__control-button--watchlist ${activeWatchlistClassName}"
              id="watchlist"
              name="watchlist"
              data-control="${FilterType.WATCHLIST}"
              >
              Add to watchlist
            </button>
            <button
              type="button"
              class="film-details__control-button film-details__control-button--watched ${activeAsWatchedClassName}"
              id="watched"
              name="watched"
              data-control="${FilterType.HISTORY}"
              >
              Already watched
            </button>
            <button
              type="button"
              class="film-details__control-button film-details__control-button--favorite ${activeFavoriteClassName}"
              id="favorite"
              name="favorite"
              data-control="${FilterType.FAVORITE}"
              >
              Add to favorites
            </button>
          </section>
        </div>

        <div class="film-details__bottom-container">
          <section class="film-details__comments-wrap">
            <h3 class="film-details__comments-title">Comments
              <span class="film-details__comments-count">${filmComments.length}</span>
            </h3>
            <ul class="film-details__comments-list">
              ${commentTemplate}
            </ul>
            <form class="film-details__new-comment" action="" method="get">
              <div class="film-details__add-emoji-label">
               ${emotion ? `<img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji">` : ''}
              </div>

              <label class="film-details__comment-label">
                <textarea
                  class="film-details__comment-input"
                  placeholder="Select reaction below and write comment here"
                  name="comment">${he.encode(comment)}</textarea>
              </label>

              <div class="film-details__emoji-list" ${isDisabled ? 'disabled' : ''}>
                ${newCommentTemplate}
              </div>
            </form>
          </section>
        </div>
      </div>
    </section>
    `
  );
};

export default class FilmPopupView extends AbstractStatefulView {
  #film = null;
  #comments = null;
  #handleCloseClick = null;
  #handleControlsClick = null;
  #handleDeleteClick = null;
  #handleAddComment = null;
  #currentFilterType = null;
  // #scrollTop = null;

  constructor({film, comments, onCloseClick, onControlsClick, currentFilterType, onDeleteClick, onAddComment}) {
    super();
    this.#film = film;
    this.#comments = comments;
    this.#currentFilterType = currentFilterType;
    this._setState ({
      emotion: null,
      comment: '',
      scrollTop: 0,
      isDeleting: null,
      isDisabled: null,
    });

    this.#handleCloseClick = onCloseClick;
    this.#handleControlsClick = onControlsClick;
    this.#handleDeleteClick = onDeleteClick;
    this.#handleAddComment = onAddComment;

    this.element.querySelector('.film-details__close')
      .addEventListener('click', this.#handleCloseClick);

    this.element.querySelector('.film-details__controls')
      .addEventListener('click', this.#controlsClickHandler);

    this.element.querySelectorAll('.film-details__comment-delete')
      .forEach((el) => el.addEventListener('click', this.#commentDeleteClickHandler));

    this.#setInnerHandlers();
  }


  get template() {
    const filmComments = this.filmComments;
    return createFilmPopupTemplate(this.#film, filmComments, this._state);
  }

  get filmComments() {
    const commentsSet = new Set(this.#film.comments);
    return this.#comments.filter((comment) => commentsSet.has(comment.id));
  }

  #controlsClickHandler = (evt) => {
    evt.preventDefault();

    if (!evt.target.id) {
      return;
    }

    let updatedDetails = this.#film.userDetails;
    let updateType;

    switch (evt.target.dataset.control) {
      case FilterType.WATCHLIST: {
        updatedDetails = { ...updatedDetails, watchlist: !this.#film.userDetails.watchlist };
        updateType = this.#currentFilterType === FilterType.WATCHLIST ? UpdateType.MINOR : UpdateType.PATCH;
        break;
      }
      case FilterType.HISTORY: {
        updatedDetails = { ...updatedDetails, alreadyWatched: !this.#film.userDetails.alreadyWatched };
        updateType = this.#currentFilterType === FilterType.HISTORY ? UpdateType.MINOR : UpdateType.PATCH;
        break;
      }
      case FilterType.FAVORITE: {
        updatedDetails = { ...updatedDetails, favorite: !this.#film.userDetails.favorite };
        updateType = this.#currentFilterType === FilterType.FAVORITE ? UpdateType.MINOR : UpdateType.PATCH;
        break;
      }
      default:
        throw new Error('Unknown state!');
    }

    this.#handleControlsClick(updatedDetails, updateType);
  };

  #setInnerHandlers = () => {
    this.element.addEventListener('scroll', this.#scrollHandler);


    //  scroll

    // document.addEventListener("DOMContentLoaded", function(evt) {
    //   let scrollpos = localStorage.getItem('scrollpos');
    //   if (scrollpos) window.scrollTo(0, scrollpos);
    // });

    // window.onbeforeunload = function(e) {
    //   localStorage.setItem('scrollpos', window.scrollY);
    // };


    this.element.querySelector('.film-details__close')
      .addEventListener('click', this.#handleCloseClick);

    this.element.querySelector('.film-details__controls')
      .addEventListener('click', this.#controlsClickHandler);

    this.element.querySelector('.film-details__emoji-list')
      .addEventListener('change', this.#emotionChangeHandler);

    this.element.querySelector('.film-details__comment-input')
      .addEventListener('input', this.#commentInputHandler);

    this.element.querySelectorAll('.film-details__comment-delete')
      .forEach((el) => el.addEventListener('click', this.#commentDeleteClickHandler));

    document.addEventListener('keydown', this.#commentAddHandler);
  };

  _restoreHandlers() {
    this.#setInnerHandlers();
  }

  #emotionChangeHandler = (evt) => {
    evt.preventDefault();

    this.updateElement({
      emotion: evt.target.value,
    });
    this.element.scrollTop = this._state.scrollTop;
  };

  #commentInputHandler = (evt) => {
    evt.preventDefault();
    this._setState({
      comment: evt.target.value
    });
  };

  #commentAddHandler = (evt) => {
    if (isCtrlEnterEvent(evt)) {
      evt.preventDefault();
      const comment = this._state.comment;
      const emotion = this._state.emotion;

      const userComment = {
        comment,
        emotion,
      };

      this.#handleAddComment({comment: userComment, film: this.#film});
      document.removeEventListener('keydown', this.#commentAddHandler);
    }
  };

  #commentDeleteClickHandler = (evt) =>{
    evt.preventDefault();
    this.#handleDeleteClick({id: evt.target.dataset.id, film: this.#film});
  };

  #scrollHandler = (evt) => {
    evt.preventDefault();

    this._setState({
      scrollTop: evt.target.scrollTop,
    });
  };

  // static parsePopupToState(film) {
  //   return {...film,
  //     isDisabled: false,
  //     isDeleting: false,
  //   }
  // }

  // static parseStateToTask(state) {
  //   const film = {...state};
  //   delete film.isDisabled;
  //   delete film.isDeleting;

  //   return film
  // }

}
