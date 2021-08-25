import { Home } from '../home/home.js';
import { About } from '../pages/about/index.js';
import { Portal } from '../portal/index.js';

export const routes = {
  '/': Portal,
  '/home': Home,
  '/about': About,
};
