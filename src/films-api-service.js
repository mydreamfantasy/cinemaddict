import { Method } from './const.js';
import ApiService from './framework/api-service.js';


export default class FilmsApiService extends ApiService {
  get films() {
    return this._load({url: 'movies'})
      .then(ApiService.parseResponse);
  }

  async updateFilm(film) {
    const response = await this._load({
      url: `movies/${film.id}`,
      method: Method.PUT,
      body: JSON.stringify(this.#adaptToServer(film)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }

  #adaptToServer(film) {
    const {
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
    } = film;

    return {
      id,
      comments,
      'film_info': {
        title,
        'alternative_title': alternativeTitle,
        'total_rating': totalRating,
        poster,
        'age_rating': ageRating,
        director,
        writers,
        actors,
        release: {
          date,
          'release_country': releaseCountry,
        },
        duration,
        genre,
        description,
      },
      'user_details': {
        watchlist,
        'already_watched': alreadyWatched,
        'watching_date': watchingDate,
        favorite,
      },
    };
  }
}
