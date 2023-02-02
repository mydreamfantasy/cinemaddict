import { getUserRating } from '../utils/utils.js';
import RankUserView from '../view/rank-user-view.js';
import {render, replace, remove} from '../framework/render.js';

export default class RankUserPresenter {
  #rankUserContainer = null;
  #filmsModel = null;
  #rankUserComponent = null;

  constructor({rankUserContainer, filmsModel}) {
    this.#rankUserContainer = rankUserContainer;
    this.#filmsModel = filmsModel;

    this.#filmsModel.addObserver(this.#handleModelEvent);
  }

  init() {
    const prevRankUserComponent = this.#rankUserComponent;
    const userRank = getUserRating(this.#filmsModel.films);

    this.#rankUserComponent = new RankUserView({rank: userRank});

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

  #handleModelEvent = () => {
    this.init();
  };
}
