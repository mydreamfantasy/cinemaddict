
import FilmsModel from './model/films-model.js';
import FilterModel from './model/filter-model.js';
import FilmsApiService from './films-api-service.js';
import { AUTHORIZATION, END_POINT } from './const.js';
import CommentsModel from './model/comments-model.js';
import CommentsApiService from './comments-api-service.js';
import FilmsPresenter from './presenter/films-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';

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
  rankContainer: siteHeaderElement,
  filmsContainer: siteMainElement,
  statisticContainer: siteFooterElement,
  filmsModel,
  commentsModel,
  filterModel
});

filmsModel.init();
filmsPresenter.init();
filterPresenter.init();
