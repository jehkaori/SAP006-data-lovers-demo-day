import { navigation } from '../../routes/navigation.js'

export const About = () => {
  const container = document.createElement('div');
  container.setAttribute('class', 'background');
  container.innerHTML = `
      <h2 class="title-sobre">SOBRE</h2>
      <h1 class="title-name">RICK AND MORTY</h1>
      <button class="btn-back" id="back-btn">&#8592;</button>
      <p class="about-text">Rick and Morty é uma série de animação adulta norte-americana de comédia 
        e ficção científica criada por Justin Roiland e Dan Harmon para o bloco de programação noturno 
        Adult Swim, exibido no canal Cartoon Network.</p>
      <p class="about-text"> É uma das animações mais insanas e viciantes produzidas até hoje. Criado inicialmente como uma
        paródia de De Volta para o Futuro, as aventuras do cientista gênio egoísta Rick e seu neto mais 
        incapaz de pensar que uma porta Morty, conquistou diversos fãs ao redor do mundo.</p>
      <p class="about-text"> Rick é um cientista brilhante e está sempre em busca de grandes experiências, indo parar até 
        em universos paralelos. Ele é bem esquentado e sempre sobra para seu neto, Morty, que o acompanha
        nessas expedições.</p>
  `;

  container.querySelector('#back-btn').addEventListener('click', (e) => {
    e.preventDefault();
    navigation('/home');
  });


  return container;
};
