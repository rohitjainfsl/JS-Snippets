const API_KEY = "8125db8f67d23da1d30f6063b1b794b8";

const form = document.querySelector("form");
const input = document.querySelector("input");
const resultsDiv = document.querySelector("#results");
const image_starting_path = "https://image.tmdb.org/t/p/original";

form.addEventListener("submit", searchMovie);

async function searchMovie(e) {
  e.preventDefault();
  //   const joSearchKarnaHai = input.value;

  // fetch(
  //   "https://api.themoviedb.org/3/search/movie?query=" +
  //     input.value +
  //     "&include_adult=false&language=en-US&page=1&api_key=" +
  //     API_KEY
  // )
  //   .then((response) => {
  //     return response.json();
  //   })
  //   .then((result) => {
  //     console.log(result);
  //   });

  const response = await fetch(
    "https://api.themoviedb.org/3/search/movie?query=" +
      input.value +
      "&include_adult=false&language=en-US&page=1&api_key=" +
      API_KEY
  );

  const result = await response.json();

  console.log(result.results);

  showData(result.results);
}

function showData(data) {
  resultsDiv.innerHTML = "";

  const resultWrapper = document.createElement("div");
  resultWrapper.classList.add("resultWrapper", "flex", "flex-wrap", "gap-4");

  for (let i = 0; i < data.length; i++) {
    const movie = document.createElement("div");
    const poster = document.createElement("img");
    const name = document.createElement("h3");

    movie.classList.add("movie", "w-[23%]");
    poster.classList.add("poster", "w-full", "h-3/4");
    name.classList.add("font-bold", "text-xl", "my-2", "text-center");

    poster.src = image_starting_path + data[i].poster_path;
    name.innerText = data[i].title || data[i].original_title;

    movie.append(poster, name);

    resultWrapper.append(movie);
  }

  resultsDiv.append(resultWrapper);
}
