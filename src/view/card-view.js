import {createElement} from '../render.js';

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

export default class CardView {
  constructor({film}) {
    this.film = film;
  }

  getTemplate() {
    return createCardTemplate(this.film);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
