import {render, replace, remove} from '../framework/render.js';

import RankUserView from '../view/rank-user-view.js';

export default class RankUserPresenter {
  #rankUserContainer = null;
  #filmsModel = null;

  #rankUserComponent = null;

  constructor({rankUserContainer, films}) {
    this.#rankUserContainer = rankUserContainer;
    this.#filmsModel = films;
  }

  init() {
    const prevRankUserComponent = this.#rankUserComponent;

    this.#rankUserComponent = new RankUserView(this.#filmsModel);

    if (prevRankUserComponent === null) {
      render(this.#rankUserComponent, this.#rankUserContainer);
      return;
    }

    render(this.#rankUserComponent, this.#rankUserContainer);
    replace(this.#rankUserComponent, prevRankUserComponent);
    remove(prevRankUserComponent);
  }

  destroy() {
    remove(this.#rankUserComponent);
  }
}
