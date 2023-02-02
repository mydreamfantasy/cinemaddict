import AbstractView from '../framework/view/abstract-view.js';

function createRankUserTemplate(rank) {
  return rank ? (
    `<section class="header__profile profile">
      <p class="profile__rating">${rank}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>
    `
  ) : '';
}

export default class RankUserView extends AbstractView {
  #rank = null;


  constructor({rank}) {
    super();
    this.#rank = rank;
  }

  get template() {
    return createRankUserTemplate(this.#rank);
  }
}
