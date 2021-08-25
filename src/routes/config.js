import { Home } from '../pages/home/home.js';
import { About } from '../pages/about/index.js';
import { Portal } from '../portal/index.js';
const notFound = document.createElement('div')
notFound.innerHTML = `não encontrado`;

export const routes = {
  '/': Portal,
  '/home': Home,
  '/about': About,
  notfound: () => notFound
};
