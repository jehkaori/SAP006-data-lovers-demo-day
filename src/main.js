import { computeStats, filterData, searchName, ordemAlfabetica } from "./data.js";
import { routeRender } from './routes/render.js';

window.addEventListener('popstate', routeRender);
window.addEventListener('load', routeRender);

fetch("./data/rickandmorty/rickandmorty.json")
  .then(response => response.json())
  .then(data => {
    mainFunction(data)
  })

function mainFunction(data) {

  const cards = document.querySelector(".cards");
  let genericCards = "";
  const btnClear = document.getElementById("btn-clearFilters");
  const searchInput = document.getElementById("search");

  const statusFilter = document.getElementById("status-filter");
  const genderFilter = document.getElementById("gender-filter");
  const specieFilter = document.getElementById("specie-filter");
  const btnOrder = document.getElementById("order-filter");

  const printTotalCharacters = document.getElementById("totalCharacters");
  const printGenderAverage = document.getElementById("genderAverage");

  printCardsGeneric(data.results);

  function printCardsGeneric(filterChosen) {
    genericCards = filterChosen
      .map(
        ({ name, status, gender, image, episode, location, species, origin }) =>
          `
            <div class="cards_container">
              <div class="character_img">
                <img src="${image}">
              </div>
              
              <ul class="front-text-card">
                <li><strong>Nome:</strong>${name}</li>
                <li><strong>Gênero:</strong>${gender}</li>      
                <li><strong>Status:</strong>${status}</li>
                <li><strong>Espécie:</strong>${species}</li>
                <li><strong>Origem:</strong>${origin.name}</li>
                <li><strong>Localização:</strong></li>
                  <p> ${location.name} </p>
                  <h4> Aparece em: </h4>
                  <p>${episode.length} episódios</p>
              </ul>

            </div>
          `
      ).join("");

    cards.innerHTML = "";
    cards.innerHTML += genericCards;
  }


  const totalCharacters = computeStats.characters(data.results);

  printTotalCharacters.innerHTML =
    `<p class="text">O total de personagens da série é:
    <p class="numberOfCharacters">${totalCharacters}</p>
   </p>`;

  const maleAverage = computeStats.gender(data.results, "Male") + "%";
  const femaleAverage = computeStats.gender(data.results, "Female") + "%";
  const genderlessAverage = computeStats.gender(data.results, "Genderless") + "%";
  const unknownAverage = computeStats.gender(data.results, "unknown") + "%";

  printGenderAverage.innerHTML =
    `
      <p class="text">&ensp;<p>Médias:</p>&ensp;
      Masculinos: <p>${maleAverage}</p> &ensp;| &ensp;  
      Femininos: <p>${femaleAverage}</p> &ensp;| &ensp;
      Desconhecidos: <p>${unknownAverage}</p>&ensp; | &ensp;
      Sem gênero: <p>${genderlessAverage}</p> &ensp;
      </p>
  `;

  function filter(e) {
    e.preventDefault();
    const statusOptions = statusFilter.options[statusFilter.selectedIndex].value;
    const genderOptions = genderFilter.options[genderFilter.selectedIndex].value;
    const specieOptions = specieFilter.options[specieFilter.selectedIndex].value;
    const filterValue = filterData(data.results, statusOptions, genderOptions, specieOptions);
    printCardsGeneric(filterValue);
  }

  function clearFilters(e) {
    e.preventDefault();
    printCardsGeneric(data.results);
    statusFilter.options[(statusFilter.selectedIndex = 0)];
    genderFilter.options[(genderFilter.selectedIndex = 0)];
    specieFilter.options[(specieFilter.selectedIndex = 0)];
  }

  function searchByName(e) {
    const charactersByName = searchName(data.results, e.target.value);
    printCardsGeneric(charactersByName);
  }

  //////////////////FUNÇÃO PARA FAZER A FILTRAGEM DE ORDEM
  function imprimirFiltroOrdem(e) {
    const order = ordemAlfabetica(data.results, e.target.value)
    printCardsGeneric(order);
  }

  statusFilter.addEventListener("change", filter);
  genderFilter.addEventListener("change", filter);
  specieFilter.addEventListener("change", filter);
  btnClear.addEventListener("click", clearFilters);
  searchInput.addEventListener("keyup", searchByName);
  btnOrder.addEventListener("change", imprimirFiltroOrdem);

}


  // const btnSort = document.getElementById("sort-btn");
/* function sort(e) {
    e.preventDefault();
    const sortCards = sortData(data.results);
    printCardsGeneric(sortCards);
  }
  btnSort.addEventListener("click", sort); */
