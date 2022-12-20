import AbstractView from '../framework/view/abstract-view.js';

function createCardTemplate(film) {
  const {
    title,
    rating,
    year,
    duration,
    genre,
    img,
    description,
    commentsCount
  } = film.filmInfo;

  const {
    watchlist,
    alreadyWatched,
    favorite
  } = film.userDetails;

  const activeWatchlistClassName = watchlist ? 'film-card__controls-item--active' : '';

  const activeAsWatchedClassName = alreadyWatched ? 'film-card__controls-item--active' : '';

  const activeFavoriteClassName = favorite ? ' film-card__controls-item--active' : '';

  return (
    `<article class="film-card">
      <a class="film-card__link">
        <h3 class="film-card__title">${title}</h3>
        <p class="film-card__rating">${rating}</p>
        <p class="film-card__info">
          <span class="film-card__year">${year}</span>
          <span class="film-card__duration">${duration}</span>
          <span class="film-card__genre">${genre}</span>
        </p>
        <img src="${img}" alt="" class="film-card__poster">
        <p class="film-card__description">${description}</p>
        <span class="film-card__comments">${commentsCount} comments</span>
      </a>
      <div class="film-card__controls">
        <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${activeWatchlistClassName}"
        type="button">
        Add to watchlist
        </button>

        <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${activeAsWatchedClassName}"
        type="button">
        Mark as watched
        </button>

        <button class="film-card__controls-item film-card__controls-item--favorite ${activeFavoriteClassName}"
        type="button">
        Mark as favorite
        </button>
      </div>
    </article>
    `
  );
}

export default class CardView extends AbstractView {
  #film = null;
  #handleOpenClick = null;

  constructor({film, onOpenClick}) {
    super();
    this.#film = film;
    this.#handleOpenClick = onOpenClick;

    this.element.querySelector('.film-card__link').addEventListener('click', this.#handleOpenClick);
  }

  get template() {
    return createCardTemplate(this.#film);
  }
}
