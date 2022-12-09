// const COMMENT_COUNT = 5;

export default class CommentsModel {
  constructor(comments) {
    this.comments = comments;
  }
  // думаю, что это строка должна не так писаться
  // comments = Array.from({length: COMMENT_COUNT}, this.comments);

  getComments() {
    return this.comments;
  }
}
