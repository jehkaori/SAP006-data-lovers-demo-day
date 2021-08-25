import { Home } from '../home/home.js';
import { About } from '../pages/about/index.js';
import { Portal } from '../portal/index.js';
import { notFound } from '../notfound/index.js'



export const routes = {
  '/Portal': Portal,
  '/': Home,
  '/About': About,
  '/page-not-found': notFound,
};
