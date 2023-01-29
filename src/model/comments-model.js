import Observable from '../framework/observable.js';
import { AdaptFilm } from '../utils/adapter.js';

export default class CommentsModel extends Observable{
  #commentsApiService = null;
  #comments = [];

  constructor(commentsApiService) {
    super();
    this.#commentsApiService = commentsApiService;
  }


  get comments() {
    return this.#comments;
  }

  async init(id) {
    this.#comments = await this.#commentsApiService.loadComments(id);
  }

  async addComment(updateType, { comment, film }) {
    try {
      const { comments, movie } = await this.#commentsApiService.addComment(comment, film);

      this.#comments = comments;
      const adaptedFilm = AdaptFilm(movie);

      this._notify(updateType, adaptedFilm);

    } catch (err) {
      throw new Error('Can\'t add comment');
    }
  }

  async deleteComment(updateType, update) {
    const index = this.#comments.findIndex((comment) => comment.id === update.id);
    if (index === -1) {
      throw new Error('Can\'t delete unexisting comment');
    }

    try {
      await this.#commentsApiService.deleteComment(update);
      this.#comments = this.#comments.filter((comment) => comment.id !== update.id);
      this._notify(updateType, update.film);
    } catch (err) {
      throw new Error('Can\'t delete comment');
    }
  }
}
