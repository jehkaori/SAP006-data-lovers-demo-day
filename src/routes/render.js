import { routes } from './config.js';

export const routeRender = () => {
  const element = document.querySelector('#root');
  element.innerHTML = '';

  const route = routes[window.location.pathname] || routes.notfound;
  element.appendChild(route());
};