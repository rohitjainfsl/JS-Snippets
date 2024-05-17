let pokemons = [];
let limit = 20;
let offset = 0;
const pokemonsDiv = document.querySelector("#pokemons");
const loadMoreBtn = document.querySelector("#loadMore");
const filterByType = document.querySelector("#filterByType");
const searchByName = document.querySelector("#searchByName");
const intro = document.querySelector("#intro");
const stickyIntro = document.querySelector(".sticky");
let done = true;

window.addEventListener("load", async () => {
  const initialData = await getDataFromAPI(
    "https://pokeapi.co/api/v2/pokemon?limit=" + limit + "&offset=" + offset
  );

  const promises = initialData.results.map((pokeObj) => {
    return getDataFromAPI(pokeObj.url);
  });

  const finalData = await Promise.all(promises);
  console.log(finalData);
  pokemons.push(...finalData);
  displayPokemons(finalData);
});

loadMoreBtn.addEventListener("click", loadMorePokemons);

filterByType.addEventListener("change", filterPokemons);

searchByName.addEventListener("keyup", searchPokemons);

function searchPokemons(e) {
  const searchTerm = e.target.value;
  let copy = pokemons;
  copy = copy.filter((pokemon) => {
    return pokemon.name.toLowerCase().includes(searchTerm);
  });

  if (copy.length === 0) {
    pokemonsDiv.innerHTML =
      "<p class='noPokemon'>NO POKEMON FOUND. CHANGE YOUR SEARCH TERM....</p>";
  } else {
    pokemonsDiv.innerHTML = "";
    displayPokemons(copy);
  }
}

function filterPokemons(e) {
  let copy = pokemons;
  copy = copy.filter((pokemon) => {
    return pokemon.types[0].type.name === e.target.value;
  });
  console.log(copy);

  pokemonsDiv.innerHTML = "";
  displayPokemons(copy);
}

async function loadMorePokemons() {
  offset += limit;
  console.log(offset);
  const newData = await getDataFromAPI(
    "https://pokeapi.co/api/v2/pokemon?limit=" + limit + "&offset=" + offset
  );

  const promises = newData.results.map((pokeObj) => {
    return getDataFromAPI(pokeObj.url);
  });

  const finalData = await Promise.all(promises);
  console.log(finalData);
  pokemons.push(...finalData);
  displayPokemons(finalData);
}

function displayPokemons(pokemonsToPrint) {
  pokemonsToPrint.forEach((pokemon) => {
    console.log(pokemon);
    const pokemonParent = document.createElement("div");
    const pokemonInner = document.createElement("div");
    const front = document.createElement("div");
    const img = document.createElement("img");
    const name = document.createElement("p");

    const back = createBackDiv(pokemon);

    pokemonParent.classList.add("pokemon");
    pokemonInner.classList.add("pokemon-inner");
    front.classList.add("front");
    name.classList.add("pokemon-name");

    name.innerText = pokemon.name;
    img.src = pokemon.sprites.other.dream_world.front_default;

    front.append(img, name);
    pokemonInner.append(front, back);
    pokemonParent.append(pokemonInner);

    pokemonsDiv.append(pokemonParent);
  });
}

function createBackDiv(pokemon) {
  const back = document.createElement("div");
  back.classList.add("back");

  let others = "";

  others += `Height: ${pokemon.height} cm<br>Weight: ${pokemon.weight} kg<br>`;

  pokemon.stats.forEach((stat) => {
    others += `${stat.stat.name}: ${stat.base_stat}<br>`;
  });

  back.innerHTML += others;

  return back;
}

async function getDataFromAPI(url) {
  const response = await fetch(url);
  const result = await response.json();
  return result;
}

window.addEventListener("scroll", () => {
  if (window.scrollY > 150 && done) createStickySearch();
  else if (window.scrollY < 150 && !done) removeStickySearch();
});

function createStickySearch() {
  stickyIntro.classList.remove("hide");
  done = false;
}
function removeStickySearch() {
  stickyIntro.classList.add("hide");
  done = true;
}
