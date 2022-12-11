import { getRandomFilm } from '../mock/films.js';

const FILM_COUNT = 5;

export default class FilmsModel {

  #films = Array.from({length: FILM_COUNT}, getRandomFilm);

  get films() {
    return this.#films;
  }
}
