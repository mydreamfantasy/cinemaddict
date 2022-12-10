import {render} from '../render.js';
import CardView from '../view/card-view.js';
import FilmListContainerView from '../view/film-list-container-view.js';
import FilmListView from '../view/film-list-view.js';
import FilmPopupView from '../view/film-popup-view.js';
import FilmSectionView from '../view/film-section-view.js';
import HiddenTitleView from '../view/hidden-title-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';

export default class FilmsPresenter {
  filmSection = new FilmSectionView();
  filmList = new FilmListView();
  filmListContainer = new FilmListContainerView();

  constructor({filmsContainer, filmsModel, commentsModel}) {
    this.filmsContainer = filmsContainer;
    this.filmsModel = filmsModel;
    this.commentsModel = commentsModel;
  }

  init() {
    this.catalogFilms = [...this.filmsModel.getFilms()];
    this.commentsList = [...this.commentsModel.getComments()];
    render(this.filmSection, this.filmsContainer);
    render(this.filmList, this.filmSection.getElement());
    render(new HiddenTitleView(), this.filmList.getElement());
    render(this.filmListContainer, this.filmList.getElement());

    this.catalogFilms.forEach((film) => {
      render(new CardView({film}), this.filmListContainer.getElement());
    });

    render(new ShowMoreButtonView(), this.filmList.getElement());
    render(new FilmPopupView({film: this.catalogFilms[0], comments: this.commentsList}), document.body);
  }
}
