import CommentsModel from './model/comments-model.js';
import FilmsModel from './model/films-model.js';
import FilmsPresenter from './presenter/films-presenter.js';
import { render } from './framework/render.js';
import RankUserView from './view/rank-user-view.js';
import FilterModel from './model/filter-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import FilmsApiService from './films-api-service.js';
import CommentsApiService from './comments-api-service.js';
import { AUTHORIZATION, END_POINT } from './const.js';

const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');
const siteFooterElement = document.querySelector('.footer__statistics');

const filmsModel = new FilmsModel({
  filmsApiService: new FilmsApiService(END_POINT, AUTHORIZATION)
});

const filterModel = new FilterModel();
const commentsModel = new CommentsModel(new CommentsApiService(END_POINT, AUTHORIZATION));

const filterPresenter = new FilterPresenter({
  filterContainer: siteMainElement,
  filterModel,
  filmsModel,
});

const filmsPresenter = new FilmsPresenter({
  filmsContainer: siteMainElement,
  statisticContainer: siteFooterElement,
  filmsModel,
  commentsModel,
  filterModel
});


filterPresenter.init();
filmsPresenter.init();
filmsModel.init()
  .finally(() => {
    render(new RankUserView(), siteHeaderElement);
  });
