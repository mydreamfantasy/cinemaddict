
// import { filter } from '../utils/filter.js';

function generateFilter(films) {
  let allFilms = 0;
  let watchlistCount = 0;
  let historyCount = 0;
  let favoriteCount = 0;

  films.forEach((film) => {
    allFilms++;

    if(film.userDetails.watchlist) {
      watchlistCount++;
    }

    if(film.userDetails.alreadyWatched) {
      historyCount++;
    }

    if(film.userDetails.favorite) {
      favoriteCount++;
    }
  });

  const counterFilms = () => ({
    all: allFilms,
    watchlist: watchlistCount,
    history: historyCount,
    favorite: favoriteCount
  });

  return Object.entries(counterFilms()).map(
    ([filterName, filterFilms]) => ({
      name: filterName,
      count: filterFilms,
    }),
  );
}

export { generateFilter };
