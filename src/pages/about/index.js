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
        <footer class="footer"> Desenvolvido pelo Squad Ada Girls:
          <p>
            <a style="color:aqua" href="https://github.com/biancacristinaalves" target="_blank">Bianca Alves</a>,
            <a style="color:aqua" href="https://github.com/carmemilya" target="_blank">Carmen Gozza</a>,
            <a style="color:aqua" href="https://github.com/gabimendesh" target="_blank">Gabrielly Mendes</a>,
            <a style="color:aqua" href="https://github.com/jehkaori" target="_blank">Jéssica Inamassu</a>,
            <a style="color:aqua" href="https://github.com/mayarabezerra" target="_blank">Mayara Bezerra</a>,
            <a style="color:aqua" href="https://github.com/ThalitaNeves95" target="_blank">Thalita Neves</a>
          </p>
        </footer>
  `;

  container.querySelector('#back-btn').addEventListener('click', (e) => {
    e.preventDefault();
    navigation('/home');
  });


  return container;
};
