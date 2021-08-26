import { navigation } from '../../routes/navigation.js'

export const About = () => {
  const container = document.createElement('div');
  container.setAttribute('class', 'background');
  container.innerHTML = `
    <button class="btn-back" id="back-btn">&#8592;</button>
      <h2 class="title-sobre">Sobre</h2>
      <h1 class="title-name">RICK AND MORTY</h1>
        <p class="about-text">Rick and Morty é uma série de animação adulta norte-americana de comédia 
        e ficção científica criada por Justin Roiland e Dan Harmon para o bloco de programação noturno 
        Adult Swim, exibido no canal Cartoon Network.</p>
        <p class="about-text"> É uma das animações mais insanas e viciantes produzidas até hoje. Criado inicialmente como uma
        paródia de De Volta para o Futuro, as aventuras do cientista gênio egoísta Rick e seu neto mais 
        incapaz de pensar que uma porta Morty, conquistou diversos fãs ao redor do mundo.</p>
        <p class="about-text"> Rick é um cientista brilhante e está sempre em busca de grandes experiências, indo parar até 
        em universos paralelos. Ele é bem esquentado e sempre sobra para seu neto, Morty, que o acompanha
        nessas expedições.</p>
          <p class="watch">Onde Asistir?</p>
          <a href="https://www.netflix.com/br/title/80014749#:~:text=Rick%20and%20Morty%20%7C%20Netflix" target="_blank"><img class="netflix" src="img/netflix.png" title="Assistir em Netflix" alt="Netflix"></a>
          <a href="https://www.hbomax.com/br/pt/rick-and-morty?utm_id=sa%7c71700000085970731%7c58700007304447408%7cp65554600674&gclid=CjwKCAjw95yJBhAgEiwAmRrutOZQ2vdQd92wTFIhKxf_D9ygOXAFxIPKD1JRPd_mmXF_ntKE7p4juhoCykAQAvD_BwE&gclsrc=aw.ds&countryRedirect=1" target="_blank"><img class="hbomax" src="img/hbomax.png" title="Assistir em HBOMax" alt="HBOMax"></a>
  `;
  
  container.querySelector('#back-btn').addEventListener('click', (e) => { 
    e.preventDefault();
    navigation('/home');
  });


  return container;
};
