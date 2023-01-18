import { TitlesSection } from '../const.js';
import AbstractView from '../framework/view/abstract-view.js';

function createFilmListSectionTemplate(title) {
  return (
    `<section class="films-list">
      <h2 class="films-list__title
      ${title === TitlesSection.ALL_MOVIES ? 'visually-hidden' : ''}"
      >
        ${title}
      </h2>
    </section>
    `
  );
}

export default class FilmListSectionView extends AbstractView {
  #title = null;
  constructor({title}) {
    super();
    this.#title = title;
  }

  get template() {
    return createFilmListSectionTemplate(this.#title);
  }
}
