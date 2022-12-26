import { FILM_COUNT } from '../const.js';
import { getRandomFilm } from '../mock/films.js';

export default class FilmsModel {

  #films = Array.from({length: FILM_COUNT}, getRandomFilm);

  get films() {
    return this.#films;
  }
}
