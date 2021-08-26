import { computeStats, filterData, searchName, sortAlphabeticalOrder } from "../../data.js";
import { navigation } from '../../routes/navigation.js';

export const Home = () => {
  const rootElement = document.createElement('div');
  rootElement.innerHTML =
   `
    <div class="header-logo">
      <button id="portal" class="portal-btn">PORTAL</button>
      <img class="Logo" src="./img/RickandMorty.png" alt="Rick and Morty">
      <button id="about" class="about-btn">SOBRE A SÉRIE</button>
    </div>
    <form class="menu-filter">
      <input class="search" type="search" placeholder="Pesquisar personagens" id="search" />
      <select class="status-filter" name="filter" id="status-filter">
          <option class="box-option" value="" selected disabled;>STATUS</option>
          <option class="box-option" value="Alive">&#128147; Vivo</option>
          <option class="box-option" value="Dead">&#128128; Morto</option>
          <option class="box-option" value="unknown">&#128100; Desconhecido</option>
      </select>
      <select class="gender-filter" name="filter" id="gender-filter">
          <option class="box-option" value="" selected disabled;>GÊNERO</option>
          <option class="box-option" value="Male">&#128102;&#127995; Masculino</option>
          <option class="box-option" value="Female">&#128103;&#127997; Feminino</option>
          <option class="box-option" value="unknown">&#128100; Desconhecido</option>
          <option class="box-option"value="Genderless">&#10068; Sem Gênero</option>
      </select>
      <select class="specie-filter" name="filter" id="specie-filter">
          <option class="box-option" value="" selected disabled;>ESPÉCIE</option>
          <option class="box-option" value="Alien">&#128125; Alien</option>
          <option class="box-option" value="Animal">&#128054; Animal</option>
          <option class="box-option" value="Cronenberg">&#128121; Cronenberg</option>
          <option class="box-option" value="Disease">&#129298; Doença</option>
          <option class="box-option" value="Human">&#129491;&#127996; Humano</option>
          <option class="box-option" value="Humanoid">&#129503; Humanóide</option>
          <option class="box-option" value="Mytholog">&#127993; Mitológico</option>
          <option class="box-option" value="Parasite">&#128027; Parasita</option>
          <option class="box-option" value="Poopybutthole">&#128169; Poopybutthole</option>
          <option class="box-option" value="Robot">&#129302; Robô</option>
          <option class="box-option" value="Vampire">&#129499; Vampiro</option>
          <option class="box-option" value="unknown">&#128100; Desconhecido</option>
      </select>
      <select name="filter" class="order-filter" id="order-filter">
          <option class="box-option" value="" selected disabled;>ORDEM</option>
          <option class="box-option" value="AZ">&#8635; A-Z</option>
          <option class="box-option" value="ZA">&#8634; Z-A</option>
      </select>
      <button class="btn-clearfilter" id="btn-clearFilters" type="submit">LIMPAR</button>

    </form>
      <div class="container">
        <section class="stats">
          <div class="total-characters" id="totalCharacters"></div>
          <div class="gender-average" id="genderAverage"></div>
        </section>
      </div>
        <section class="cards"></section>
        <div class="btnsMS">
        <button id="button-more">MAIS</button>
        <button id="button-all">TUDO</button>
      </div>
      <footer class="footer"> Desenvolvido pelo Squad Ada Girls:
        <p class="footer-link">
          <a style="color:aqua" href="https://github.com/biancacristinaalves" target="_blank">Bianca Alves</a>,
          <a style="color:aqua" href="https://github.com/carmemilya" target="_blank">Carmen Gozza</a>,
          <a style="color:aqua" href="https://github.com/gabimendesh" target="_blank">Gabrielly Mendes</a>,
          <a style="color:aqua" href="https://github.com/jehkaori" target="_blank">Jéssica Inamassu</a>,
          <a style="color:aqua" href="https://github.com/mayarabezerra" target="_blank">Mayara Bezerra</a>,
          <a style="color:aqua" href="https://github.com/ThalitaNeves95" target="_blank">Thalita Neves</a>
        </p>
     </footer>
  `

  fetch("./data/rickandmorty/rickandmorty.json")
    .then(response => response.json())
    .then(data => {
      mainFunction(data)
  })

  rootElement.querySelector('#about').addEventListener('click', (e) => {
    e.preventDefault();
    navigation('/about')
  });

  rootElement.querySelector('#portal').addEventListener('click', (e) => {
    e.preventDefault();
    navigation('/')
});



  function mainFunction(data) {

    const cards = document.querySelector(".cards");
    let genericCards = "";
    const btnClear = document.getElementById("btn-clearFilters");
    const searchInput = document.getElementById("search");
    const selectStatus = document.getElementById("status-filter");
    const selectGender = document.getElementById("gender-filter");
    const selectSpecie = document.getElementById("specie-filter");
    const btnOrder = document.getElementById("order-filter");
    const showCardsMore = document.getElementById("button-more");
    const showCardsAll = document.getElementById("button-all");

    const printTotalCharacters = document.getElementById("totalCharacters");
    const printGenderAverage = document.getElementById("genderAverage");
    let finalArray = 8;
    let visible = data.results;
    let showCards = visible.slice(0, finalArray);

    printCardsGeneric(showCards);

    function printCardsGeneric(filterChosen) {
      genericCards = filterChosen
        .map(
          ({ name, status, gender, image, episode, location, species, origin }) =>
          `
          <div class="cards_container">
            <div class="front-card">
              <img class='img-character' src="${image}">
              <h3  class='name'>${name}</h3>
            </div>
            <div class="back-text-card">
                <ul class="list">
                    <li class='name-back'><strong>Nome:</strong>${name}</li>
                    <li><strong>Gênero:</strong>${gender}</li>
                    <li><strong>Status:</strong>${status}</li>
                    <li><strong>Espécie:</strong>${species}</li>
                    <li><strong>Origem:</strong>${origin.name}</li>
                    <li><strong>Localização:</strong></li>
                        <li> ${location.name} </li>
                        <li> Aparece em: </li>
                        <li>${episode.length} episódios</li>
                </ul>
            </div>
          </div>
        `
      ).join("");

      cards.innerHTML = "";
      cards.innerHTML += genericCards;
    }


    const filter = () => {
      let allCharacters = data.results;
      visible = allCharacters;
      showCards = visible.slice(0, finalArray);
      const species = selectSpecie.value;
      const gender = selectGender.value;
      const status = selectStatus.value;

      if (species){
        visible = filterData(visible, "species", species);
      }
      if (gender){
        visible = filterData(visible, "gender", gender);
      }
      if (status){
        visible = filterData( visible, "status", status);
      }
      printCardsGeneric(visible.slice(0, showCards.length >= 8 ? showCards.length : 8));

    }

    printTotalCharacters.innerHTML = `O número total de personagens da série é ${(data.results).length}`

    const calculateStatus = () => {

      const newstatus = computeStats(visible, "status", selectStatus.value);
      printGenderAverage.innerHTML = (`O número de personagens dessa categoria é ${newstatus}`);
    }

    const calculateSpecies = () => {

      const newstatus = computeStats(visible, "species", selectSpecie.value);
      printGenderAverage.innerHTML = (`O número de personagens dessa categoria é ${newstatus}`);
    }

    const calculateGender = () =>  {

      const newstatus = computeStats(visible, "gender", selectGender.value);
      printGenderAverage.innerHTML = (`O número de personagens dessa categoria é ${newstatus}`);
    }

    const searchByName = () => {
      const charactersByName = searchName(data.results, );
      printCardsGeneric(charactersByName);
    }

    const clearFilters = (e) => {
      visible = '';
      printCardsGeneric(visible,e)
    }

    //////////////////FUNÇÃO PARA FAZER A FILTRAGEM DE ORDEM
    const imprimirFiltroOrdem = () => {
      const order = sortAlphabeticalOrder(visible, btnOrder.value)
      printCardsGeneric(order);
    }

    showCardsMore.addEventListener("click", () => {
      finalArray += 8
      printCardsGeneric(visible.slice(0, finalArray))
    });
    showCardsAll.addEventListener("click", () => {
      printCardsGeneric(visible);
    });

    selectStatus.addEventListener("change", () => {filter(), calculateStatus()});
    selectSpecie.addEventListener("change", () => {filter(), calculateSpecies()});
    selectGender.addEventListener("change", () => {filter(), calculateGender()});
    btnClear.addEventListener("click", () => {clearFilters()});
    searchInput.addEventListener("keyup", () => {searchByName()});
    btnOrder.addEventListener("change", () => {imprimirFiltroOrdem()});

  }
  return rootElement

};
