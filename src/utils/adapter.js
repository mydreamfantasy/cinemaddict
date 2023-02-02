export const adaptFilm = (film) => {
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
};
