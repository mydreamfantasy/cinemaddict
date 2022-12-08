import { getRandomComment } from '../mock/films.js';

const COMMENT_COUNT = 5;

export default class CommentsModel {
  films = Array.from({length: COMMENT_COUNT}, getRandomComment);

  getFilms() {
    return this.films;
  }
}
