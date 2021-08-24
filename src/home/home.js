// import { computeStats, filterData, sortData, searchName } from "./data.js";
// import { navigation } from '../routes/navigation.js';

export const Home = () => {
    const rootElement = document.createElement('div');
    rootElement.innerHTML = `
     <h1>
       <img src="./img/iconTitle.png" alt="Rick and Morty">
     </h1>
    <form class="menu-filter">
        <input type="search" placeholder="Pesquisar" id="search" />
        <button id="sort-btn" class="sort">Personagens Principais</button>
        <select name="filter" id="status-filter">
            <option class="status" value="" selected disabled;>STATUS</option>
            <option value="Alive">VIVO</option>
            <option value="Dead">MORTO</option>
            <option value="unknown">DESCONHECIDO</option>
        </select>
        <select name="filter" id="gender-filter">
            <option class="gender" value="" selected disabled;>GÊNERO</option>
            <option value="Male">MASCULINO</option>
            <option value="Female">FEMININO</option>
            <option value="unknown">DESCONHECIDO</option>
            <option value="Genderless">SEM GÊNERO</option>
        </select>
        <button id="btn-clearFilters" type="submit">LIMPAR</button>
    </form>
    <div class="container">
        <section class="stats">
            <div id="totalCharacters"></div>
            <div id="genderAverage"></div>
        </section>
        
            <section class="cards"></section>
    </div>`

    fetch("./data/rickandmorty/rickandmorty.json")
    .then(response => response.json())
    .then(data => {
    mainFunction(data)
    })

    function mainFunction(data) {

    const cards = document.querySelector(".cards");
    let genericCards = "";
    const btnClear = document.getElementById("btn-clearFilters");
    const btnSort = document.getElementById("sort-btn");
    const searchInput = document.getElementById("search");

    const statusFilter = document.getElementById("status-filter");
    const genderFilter = document.getElementById("gender-filter");

    const printTotalCharacters = document.getElementById("totalCharacters");
    const printGenderAverage = document.getElementById("genderAverage");

    printCardsGeneric(data.results);

    function printCardsGeneric(filterChosen) {
    genericCards = filterChosen
        .map(
        ({ name, status, gender, image, episode }) =>
        `<div class="cards_container">
            <div class="character_img">
                <img src="${image}">
                <h3>${name}</h3>
            </div>
            <div class="character_info">
                <span id="character_name">
                <h3>${name}</h3>
                </span>
                <span id="character_status">${status} - ${gender}</span>
                <span id="episodes">Episódios</span>
                <p>${episode.map((i) => i.replaceAll(/[^0-9]/g, " "))}</p>
            </div>
        </div>`
        )
        .join("");

    cards.innerHTML = "";
    cards.innerHTML += genericCards;
    }


    const totalCharacters = computeStats.characters(data.results);

    printTotalCharacters.innerHTML =
    `<p class="text">O total de personagens da série é:
    <span class="numberOfCharacters">${totalCharacters}</span>
    </p>`;

    const maleAverage = computeStats.gender(data.results, "Male") + "%";
    const femaleAverage = computeStats.gender(data.results, "Female") + "%";
    const genderlessAverage = computeStats.gender(data.results, "Genderless") + "%";
    const unknownAverage = computeStats.gender(data.results, "unknown") + "%";

    printGenderAverage.innerHTML =
    `
        <p class="text">&ensp;<span>Médias:</span>&ensp;
        Masculinos: <span>${maleAverage}</span> &ensp;| &ensp;  
        Femininos: <span>${femaleAverage}</span> &ensp;| &ensp;
        Desconhecidos: <span>${unknownAverage}</span>&ensp; | &ensp;
        Sem gênero: <span>${genderlessAverage}</span> &ensp;
        </p>
    `;

    function filter(e) {
    e.preventDefault();
    const statusOptions = statusFilter.options[statusFilter.selectedIndex].value;
    const genderOptions = genderFilter.options[genderFilter.selectedIndex].value;
    const filterValue = filterData(data.results, statusOptions, genderOptions);
    printCardsGeneric(filterValue);
    }
    statusFilter.addEventListener("change", filter);
    genderFilter.addEventListener("change", filter);

    function sort(e) {
    e.preventDefault();
    const sortCards = sortData(data.results);
    printCardsGeneric(sortCards);
    }
    btnSort.addEventListener("click", sort);

    function clearFilters(e) {
    e.preventDefault();
    printCardsGeneric(data.results);
    statusFilter.options[(statusFilter.selectedIndex = 0)];
    genderFilter.options[(genderFilter.selectedIndex = 0)];
    }
    btnClear.addEventListener("click", clearFilters);

    function searchByName(e) {
    const charactersByName = searchName(data.results, e.target.value);
    printCardsGeneric(charactersByName);
    }
    searchInput.addEventListener("keyup", searchByName);

    }
    return rootElement;
}