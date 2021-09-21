import { Portal } from '../portal/index.js';
import { Home } from '../pages/home/home.js';
import { About } from '../pages/about/index.js';
import { notFound } from '../notfound/index.js';

export const routes = {
  '/': Portal,
  '/home': Home,
  '/about': About,
  notfound: () => notFound()
};
