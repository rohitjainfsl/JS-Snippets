let limit = 20;
let offset = 0;
const pikapikaDiv = document.querySelector("#pikapika");
const loadMoreButton = document.querySelector(".loadMore");

window.addEventListener("load", async () => {
  const data = await getDataFromAPI(
    "https://pokeapi.co/api/v2/pokemon?limit=" + limit + "&offset=" + offset
  );
  //   console.log(data);
  console.log(data.results);

  populatePokemons(data);
});

function showExtraDiv(e) {
  if (e.target.innerText === "Know More") {
    e.target.innerText = "Know Less";
    e.target.nextElementSibling.style.display = "block";
    e.target.nextElementSibling.style.opacity = 1;
  } else {
    e.target.innerText = "Know More";
    e.target.nextElementSibling.style.display = "none";
    e.target.nextElementSibling.style.opacity = 0;
  }
}

async function getDataFromAPI(url) {
  const response = await fetch(url);
  const result = await response.json();
  return result;
}

async function populatePokemons(data) {
  // Batch fetch Pokémon data
  const promises = data.results.map((pokemon) => getDataFromAPI(pokemon.url));
  const pokemonData = await Promise.all(promises);

  // Loop through fetched data and populate DOM
  pokemonData.forEach((pokemon) => {
    const div = document.createElement("div");
    div.classList.add("parent");

    const image = document.createElement("img");
    image.src = pokemon.sprites.other.dream_world.front_default;

    const name = document.createElement("p");
    name.innerText = pokemon.name;

    const type = document.createElement("p");
    type.innerText = "Type: " + pokemon.types[0].type.name;

    const knowMore = document.createElement("button");
    knowMore.innerText = "Know More";
    knowMore.addEventListener("click", showExtraDiv);

    const extraDiv = document.createElement("div");
    extraDiv.classList.add("extraDiv");

    const height = document.createElement("p");
    height.innerHTML = "<strong>Height: </strong>" + pokemon.height + " cm";
    extraDiv.append(height);

    const weight = document.createElement("p");
    weight.innerHTML = "<strong>Weight: </strong>" + pokemon.weight + " kg";
    extraDiv.append(weight);

    pokemon.stats.forEach((stat) => {
      const para = document.createElement("p");
      para.classList.add("stat");
      para.innerHTML =
        "<strong>" + stat.stat.name + "</strong>" + stat.base_stat;

      extraDiv.append(para);
    });

    div.append(image);
    div.append(name);
    div.append(type);
    div.append(knowMore);
    div.append(extraDiv);

    pikapikaDiv.append(div);
  });
}

loadMoreButton.addEventListener("click", async () => {
  offset = offset + limit;
  const response = await getDataFromAPI(
    "https://pokeapi.co/api/v2/pokemon?limit=" + limit + "&offset=" + offset
  );

  populatePokemons(response);
});
