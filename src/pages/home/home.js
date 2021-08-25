import { computeStats, filterData, searchName, ordemAlfabetica } from "../../data.js";
import { navigation } from '../../routes/navigation.js';

export const Home = () => {
    const rootElement = document.createElement('div');
    rootElement.innerHTML = `  
        <div class="header-logo">
            <img class="Logo" src="./img/RickandMorty.png" alt="Rick and Morty">
            <button id="about" class="about-btn">SOBRE A SÉRIE</button>
        </div>
        <form class="menu-filter">
            <input class="search" type="search" placeholder="Pesquisar personagens" id="search" />
            <button class="sort-characters" id="sort-btn" class="sort">PERSONAGENS PRINCIPAIS</button>

            <select class="status-filter" name="filter" id="status-filter">
                <option class="status" value="" selected disabled;>STATUS</option>
                <option value="Alive">&#128147; Vivo</option>
                <option value="Dead">&#128128; Morto</option>
                <option value="unknown">&#128100; Desconhecido</option>
            </select>

            <select class="gender-filter" name="filter" id="gender-filter">
                <option class="gender" value="" selected disabled;>GÊNERO</option>
                <option value="Male">&#128102;&#127995; Masculino</option>
                <option value="Female">&#128103;&#127997; Feminino</option>
                <option value="unknown">&#128100; Desconhecido</option>
                <option value="Genderless">&#10068; Sem Gênero</option>
            </select>

            <select class="specie-filter" name="filter" id="specie-filter">
                <option class="species" value="" selected disabled;>ESPÉCIE</option>
                <option value="Alien">&#128125; Alien</option>
                <option value="Animal">&#128054; Animal</option>
                <option value="Cronenberg">&#128121; Cronenberg</option>
                <option value="Disease">&#129298; Doença</option>
                <option value="Human">&#129491;&#127996; Humano</option>
                <option value="Humanoid">&#129503; Humanóide</option>
                <option value="Mytholog">&#127993; Mitológico</option>
                <option value="Parasite">&#128027; Parasita</option>
                <option value="Poopybutthole">&#128169; Poopybutthole</option>
                <option value="Robot">&#129302; Robô</option>
                <option value="Vampire">&#129499; Vampiro</option>
                <option value="Unknown">&#128100; Indefinido</option>
            </select>

            <select name="filter" class="order-filter" id="order-filter">
                <option value="" selected disabled;>ORDEM</option>
                <option value="AZ">&#8635; A-Z</option>
                <option value="ZA">&#8634; Z-A</option>
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
                <p class="text">
                    <p>Médias:</p>
                    <p>Masculinos:${maleAverage}</p>
                    <p>Femininos:${femaleAverage}</p>
                    <p>Desconhecidos: ${unknownAverage}</p>
                    <p>Sem gênero:${genderlessAverage}</p>
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
            btnOrder.options[(btnOrder.selectedIndex = 0)];
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
    return rootElement
};
            // const btnSort = document.getElementById("sort-btn");
/* function sort(e) {
    e.preventDefault();
    const sortCards = sortData(data.results);
    printCardsGeneric(sortCards);
  }
  btnSort.addEventListener("click", sort); */
