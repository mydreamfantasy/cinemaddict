import {render} from '../render.js';
import CardView from '../view/card-view.js';
import FilmListContainerView from '../view/film-list-container-view.js';
import FilmListView from '../view/film-list-view.js';
import FilmSectionView from '../view/film-section-view.js';
import HiddenTitleView from '../view/hidden-title-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';

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
    render(new HiddenTitleView(), this.filmList.getElement());
    render(this.filmListContainer, this.filmList.getElement());

    for (let i = 0; i < 5; i++) {
      render(new CardView(), this.filmListContainer.getElement());
    }

    render(new ShowMoreButtonView(), this.filmSection.getElement());
  }
}
