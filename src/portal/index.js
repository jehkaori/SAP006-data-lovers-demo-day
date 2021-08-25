import { navigation } from '../routes/navigation.js';

export const Portal = () => {
  const rootElement = document.createElement('div');
  rootElement.innerHTML = `
  <div class="item">
    <img class="portal-welcome" src="../../img/rick-and-morty-portal.png" alt="">
  </div>
  `
  const imgWelcome = rootElement.querySelector('.portal-welcome');

  imgWelcome.addEventListener("click", () => {
    imgWelcome.style.opacity = "0";
    imgWelcome.style.transition = "all 15s 10s"
    navigation("/Home")
  });

  return rootElement

}
