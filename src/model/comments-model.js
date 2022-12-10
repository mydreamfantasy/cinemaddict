// const COMMENT_COUNT = 5;

export default class CommentsModel {
  constructor(comments) {
    this.comments = comments;
  }

  getComments() {
    return this.comments;
  }
}
