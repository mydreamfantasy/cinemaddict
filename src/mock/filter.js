
import { filter } from '../utils/filter.js';


// const checkWatchlist = ({ userDetails }) => userDetails.watchlist;
// const checkHistory = ({ userDetails }) => userDetails.alreadyWatched;
// const checkFavorite = ({ userDetails }) => userDetails.favorite;

function generateFilter(films) {
  return Object.entries(filter).map(
    ([filterName, filterFilms]) => ({
      name: filterName,
      count: filterFilms(films).length,
    }),
  );
}

export { generateFilter };
