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

  constructor({filmsContainer, filmsModel, popupContainer, commentsModel}) {
    this.filmsContainer = filmsContainer;
    this.filmsModel = filmsModel;
    this.popupContainer = popupContainer;
    this.commentsModel = commentsModel;
  }

  init() {
    this.catalogFilms = [...this.filmsModel.getFilms()];
    // this.commentsList = [...this.commentsModel.getComments()]
    render(this.filmSection, this.filmsContainer);
    render(this.filmList, this.filmSection.getElement());
    render(new HiddenTitleView(), this.filmList.getElement());
    render(this.filmListContainer, this.filmList.getElement());

    // не получается так
    // this.catalogFilms.forEach((i) => {
    //   render(new CardView({film: this.catalogFilms[i]}), this.filmListContainer.getElement())
    // })
    for (let i = 0; i < this.catalogFilms.length; i++) {
      render(new CardView({film: this.catalogFilms[i]}), this.filmListContainer.getElement());
    }

    render(new ShowMoreButtonView(), this.filmList.getElement());
    render(new FilmPopupView({film: this.catalogFilms[0]}), this.popupContainer.getElement()); // пишет ошибку
  }
}
