import FilmsPresenter from './presenter/films-presenter.js';
import {render} from './render.js';
import FilmPopupView from './view/film-popup.js';
import SortView from './view/filters.js';
import NavView from './view/nav.js';
import RankUserView from './view/rank-user.js';
import StatisticView from './view/statistic.js';

const siteBodyElement = document.querySelector('body');
const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');
const siteFooterElement = document.querySelector('.footer__statistics');
const filmsPresenter = new FilmsPresenter({filmsContainer: siteMainElement});


render(new RankUserView(), siteHeaderElement);
render(new NavView(), siteMainElement);
render(new SortView(), siteMainElement);
render(new StatisticView(), siteFooterElement);

filmsPresenter.init();
render(new FilmPopupView(), siteBodyElement);
