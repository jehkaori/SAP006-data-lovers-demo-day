import { navigation } from '../routes/navigation.js';

export const Portal = () => {
  const rootElement = document.createElement('div');
  rootElement.innerHTML = `
  <div class="item">
    <img class="portal-welcome" src="../../img/rick-and-morty-rick-png.gif" alt="">
  </div>
  `
  const imgWelcome = rootElement.querySelector('.portal-welcome');

  imgWelcome.addEventListener("click", () =>{
  imgWelcome.style.opacity = "0";
  navigation("/home")
  });

  return rootElement

}
