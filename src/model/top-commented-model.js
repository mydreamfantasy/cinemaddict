import { TOP_COMMENT_COUNT } from '../const.js';
import { getRandomFilm } from '../mock/films.js';

export default class TopCommentedModel {

  #films = Array.from({length: TOP_COMMENT_COUNT}, getRandomFilm).sort((a, b) => a.comments.length > b.comments.length ? 1 : -1);


  get films() {
    return this.#films;
  }
}
