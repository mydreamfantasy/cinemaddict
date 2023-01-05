import AbstractView from '../framework/view/abstract-view.js';

const createCommentTemplate = (comments) => comments.map((comment) => `
  <li class="film-details__comment">
    <span class="film-details__comment-emoji">
      <img src="./images/emoji/${comment.emotion}.png" width="55" height="55" alt="emoji-smile">
    </span>
    <div>
      <p class="film-details__comment-text">${comment.comment}</p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author">${comment.author}</span>
        <span class="film-details__comment-day">${comment.commentDate}</span>
        <button class="film-details__comment-delete">Delete</button>
      </p>
    </div>
  </li>
`).join('');

const createFilmPopupTemplate = (film, filmComments) => {
  const {
    title,
    originalTitle,
    rating,
    ageRating,
    duration,
    genres,
    img,
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

  const commentTemplate = createCommentTemplate(filmComments);

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
              <img class="film-details__poster-img" src="${img}" alt="">

              <p class="film-details__age">${ageRating}</p>
            </div>

            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${title}</h3>
                  <p class="film-details__title-original">Original: ${originalTitle}</p>
                </div>

                <div class="film-details__rating">
                  <p class="film-details__total-rating">${rating}</p>
                </div>
              </div>

              <table class="film-details__table">
                <tr class="film-details__row">
                  <td class="film-details__term">Director</td>
                  <td class="film-details__cell">${director}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Writers</td>
                  <td class="film-details__cell">${writers}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Actors</td>
                  <td class="film-details__cell">${actors}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Release Date</td>
                  <td class="film-details__cell">${date}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Duration</td>
                  <td class="film-details__cell">${duration}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Country</td>
                  <td class="film-details__cell">${releaseCountry}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Genres</td>
                  <td class="film-details__cell">
                    <span class="film-details__genre">${genres}</span>
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
              >
              Add to watchlist
            </button>
            <button
              type="button"
              class="film-details__control-button film-details__control-button--watched ${activeAsWatchedClassName}"
              id="watched"
              name="watched"
              >
              Already watched
            </button>
            <button
              type="button"
              class="film-details__control-button film-details__control-button--favorite ${activeFavoriteClassName}"
              id="favorite"
              name="favorite"
              >
              Add to favorites
            </button>
          </section>
        </div>

        <div class="film-details__bottom-container">
          <section class="film-details__comments-wrap">
            <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${filmComments.length}</span></h3>
            <ul class="film-details__comments-list">
              ${commentTemplate}
            </ul>
            <form class="film-details__new-comment" action="" method="get">
              <div class="film-details__add-emoji-label"></div>

              <label class="film-details__comment-label">
                <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here"
                  name="comment"></textarea>
              </label>

              <div class="film-details__emoji-list">
                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile"
                  value="smile">
                <label class="film-details__emoji-label" for="emoji-smile">
                  <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio"
                  id="emoji-sleeping" value="sleeping">
                <label class="film-details__emoji-label" for="emoji-sleeping">
                  <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke"
                  value="puke">
                <label class="film-details__emoji-label" for="emoji-puke">
                  <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry"
                  value="angry">
                <label class="film-details__emoji-label" for="emoji-angry">
                  <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
                </label>
              </div>
            </form>
          </section>
        </div>
      </div>
    </section>
    `
  );
};

export default class FilmPopupView extends AbstractView {
  #film = null;
  #comments = null;
  #handleCloseClick = null;

  constructor({film, comments, onCloseClick}) {
    super();
    this.#film = film;
    this.#comments = comments;

    this.#handleCloseClick = onCloseClick;

    this.element.querySelector('.film-details__close')
      .addEventListener('click', () => this.#handleCloseClick(this.#film));
  }

  get template() {
    const filmComments = this.filmComments;
    return createFilmPopupTemplate(this.#film, filmComments);
  }

  get filmComments() {
    const commentsSet = new Set(this.#film.comments);
    return this.#comments.filter((comment) => commentsSet.has(comment.id));
  }
}
