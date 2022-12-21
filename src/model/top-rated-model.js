import { TOP_RATED_COUNT } from '../const.js';
import { getRandomFilm } from '../mock/films.js';

export default class TopRatedModel {

  #films = Array.from({length: TOP_RATED_COUNT}, getRandomFilm).sort((a, b) => a.filmInfo.rating > b.filmInfo.rating ? 1 : -1);

  get films() {
    return this.#films;
  }
}
