import Observable from '../framework/observable.js';

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

  async addComment(updateType, update) {
    let newComment;
    let film;

    try {
      newComment = await this.#commentsApiService.addComment(update.comment, update.film);
      film = this.#adaptToClient(newComment.movie);
      // console.log(updateType, film);

      this._notify(updateType, film);
    }
    catch(err) {
      throw new Error('Can\'t add comment');
    }

    this.#comments = [
      newComment,
      ...this.#comments,
    ];
  }

  async deleteComment(updateType, update) {
    const index = this.#comments.findIndex((comment) => comment.id === update.id);
    if (index === -1) {
      throw new Error('Can\'t delete unexisting comment');
    }

    try{
      await this.#commentsApiService.deleteComment(update);
      this.#comments = this.#comments.filter((comment) => comment.id !== update.id);
      this._notify(updateType, update.film);
    } catch (err) {
      throw new Error('Can\'t delete comment');
    }
  }

  #adaptToClient(film) {

    const {
      id,
      comments,
      film_info: {
        title,
        alternative_title: alternativeTitle,
        total_rating: totalRating,
        poster,
        age_rating: ageRating,
        director,
        writers,
        actors,
        release: {
          date,
          release_country: releaseCountry,
        },
        duration,
        genre,
        description,
      },
      user_details: {
        watchlist,
        already_watched: alreadyWatched,
        watching_date: watchingDate,
        favorite,
      },
    } = film;

    return {
      id,
      comments,
      filmInfo: {
        title,
        alternativeTitle,
        totalRating,
        poster,
        ageRating,
        director,
        writers,
        actors,
        release: {
          date,
          releaseCountry,
        },
        duration,
        genre,
        description,
      },
      userDetails: {
        watchlist,
        alreadyWatched,
        watchingDate,
        favorite,
      },
    };
  }
}
