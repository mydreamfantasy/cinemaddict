import Observable from '../framework/observable.js';

export default class CommentsModel extends Observable{
  #comments = null;

  constructor(comments) {
    super();
    this.#comments = comments;
  }

  get comments() {
    return this.#comments;
  }

  addComment(updateType, update) {
    this.#comments = [
      update,
      ...this.#comments,
    ];

    this._notify(updateType, update);
  }

  deleteComment(updateType, deletedId) {
    const index = this.#comments.findIndex((comment) => comment.id === deletedId);
    if (index === -1) {
      throw new Error('Can\'t delete unexisting task');
    }

    this.#comments = [
      ...this.#comments.slice(0, index),
      ...this.#comments.slice(index + 1),
    ];
    this._notify(updateType);
  }
}
