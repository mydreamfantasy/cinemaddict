import { mockComments } from './mock/films.js';
import CommentsModel from './model/comments-model.js';
import FilmsModel from './model/films-model.js';
import FilmsPresenter from './presenter/films-presenter.js';
import { render } from './framework/render.js';
import SortView from './view/sort-view.js';
import FiltersView from './view/filters-view.js';
import RankUserView from './view/rank-user-view.js';
import StatisticView from './view/statistic-view.js';
import { generateFilter } from './mock/filter.js';
import TopCommentedModel from './model/top-commented-model.js';
import TopRatedModel from './model/top-rated-model.js';


const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');
const siteFooterElement = document.querySelector('.footer__statistics');
// const filters = generateFilter(FilmsModel.films);
const filmsModel = new FilmsModel();
const commentsModel = new CommentsModel(mockComments);
const topCommentedModel = new TopCommentedModel();
const topRatedModel = new TopRatedModel();
const filmsPresenter = new FilmsPresenter({
  filmsContainer: siteMainElement,
  filmsModel,
  commentsModel,
  topCommentedModel,
  topRatedModel
});


render(new RankUserView(), siteHeaderElement);
// render(new FiltersView({filters}), siteMainElement);
render(new SortView(), siteMainElement);
render(new StatisticView(), siteFooterElement);

filmsPresenter.init();

