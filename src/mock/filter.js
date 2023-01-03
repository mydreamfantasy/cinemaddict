function generateFilter(films) {

  const total = {
    all: 0,
    watchlist: 0,
    history: 0,
    favorite: 0
  };
  films.forEach((film) => {
    if (film.userDetails.watchlist) {
      total.watchlist++;
    }

    if (film.userDetails.alreadyWatched) {
      total.history++;
    }

    if (film.userDetails.favorite) {
      total.favorite++;
    }
  });

  return total;
}

export { generateFilter };
