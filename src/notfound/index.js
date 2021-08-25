export const notFound = () => {
  const rootElement = document.createElement('div');
  const containerElement = ` <div class="container">
    <div class="noise"></div>
    <div class="overlay"></div>
    <div class="terminal">
      <h1>Error <span class="errorcode">404</span></h1>
      <p class="output">A página que você está procurando pode ter sido removida, teve seu nome alterado ou está temporariamente indisponível.</p>
      <p class="output">Por favor, tente <a href="/home">voltar</a> ou <a href="#2">retornar para homepage</a>.</p>
      </div>
      </div>`;

  rootElement.innerHTML = containerElement;

  return rootElement;
};