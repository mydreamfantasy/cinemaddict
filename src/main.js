import { mockComments } from './mock/films.js';
import CommentsModel from './model/comments-model.js';
import FilmsModel from './model/films-model.js';
import FilmsPresenter from './presenter/films-presenter.js';
import { render } from './framework/render.js';
import RankUserView from './view/rank-user-view.js';
import StatisticView from './view/statistic-view.js';
import { generateFilter } from './mock/filter.js';


const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');
const siteFooterElement = document.querySelector('.footer__statistics');
const filmsModel = new FilmsModel();
const filters = generateFilter(filmsModel.films);
const commentsModel = new CommentsModel(mockComments);
const filmsPresenter = new FilmsPresenter({
  filmsContainer: siteMainElement,
  filmsModel,
  commentsModel,
  filters
});


render(new RankUserView(), siteHeaderElement);
render(new StatisticView(), siteFooterElement);

filmsPresenter.init();

