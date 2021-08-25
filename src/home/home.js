import { computeStats, filterData, sortData, searchName } from "../data.js";
// import { navigation } from '../routes/navigation.js';

export const Home = () => {
    const rootElement = document.createElement('div');
    rootElement.innerHTML = `
     <h1>
       <img src="./img/iconTitle.png" alt="Rick and Morty">
     </h1>
    <form class="menu-filter">
        <input type="search" class="input-search" id="search" placeholder="Pesquisar"/>
        <button class="sort" id="sort-btn">Personagens Principais</button>
        <select name="filter" class="status-filtro" id="status-filter">
            <option class="status" value="" selected disabled;>STATUS</option>
            <option value="Alive">VIVO</option>
            <option value="Dead">MORTO</option>
            <option value="unknown">DESCONHECIDO</option>
        </select>
        <select name="filter" class="gender-filtro" id="gender-filter">
            <option class="gender" value="" selected disabled;>GÊNERO</option>
            <option value="Male">MASCULINO</option>
            <option value="Female">FEMININO</option>
            <option value="unknown">DESCONHECIDO</option>
            <option value="Genderless">SEM GÊNERO</option>
        </select>
        <button class="btn-limpar" id="btn-clearFilters" type="submit">LIMPAR</button>
    </form>
    <div class="container">
        <section class="stats">
            <div class="total-characters" id="total-characters"></div>
            <div class="gender-average" id="gender-average"></div>
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

        const printTotalCharacters = document.getElementById("total-characters");
        const printGenderAverage = document.getElementById("gender-average");

        printCardsGeneric(data.results);

        function printCardsGeneric(filterChosen) {
            genericCards = filterChosen
              .map(
                ({ name, status, gender, image, episode, location, species, origin }) =>
                `
                <div class="cards_container">
                    <div class="character_img">
                      <img src="${image}">
                      <h3>${name}</h3>
                    </div>
                      
                    <ul class="back-text-card">
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