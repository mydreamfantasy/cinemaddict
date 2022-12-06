import {render} from '../render.js';
import CardView from '../view/card.js';
import FilmListContainerView from '../view/film-list-container.js';
import FilmListView from '../view/film-list.js';
import FilmSectionView from '../view/film-section.js';
import HiddenTitleView from '../view/hidden-title-movies.js';
import ShowMoreButtonView from '../view/show-more-btn.js';

export default class FilmsPresenter {
  filmSection = new FilmSectionView();
  filmList = new FilmListView();
  filmListContainer = new FilmListContainerView();

  constructor({filmsContainer}) {
    this.filmsContainer = filmsContainer;
  }

  init() {
    render(this.filmSection, this.filmsContainer);
    render(this.filmList, this.filmSection.getElement());
    render(new HiddenTitleView(), this.filmSection.getElement());
    render(this.filmListContainer, this.filmList.getElement());

    for (let i = 0; i < 5; i++) {
      render(new CardView(), this.filmListContainer.getElement());
    }

    render(new ShowMoreButtonView(), this.filmSection.getElement());
  }
}
