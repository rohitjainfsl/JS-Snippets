const API_KEY = YOUR_API_KEY_HERE;
const img_base_path = "https://image.tmdb.org/t/p/original";
const moviesDiv = document.querySelector("#movies .movie-wrapper");
const genreList = document.querySelector(".genreList ul");
let movieResults = "";

async function fetchGenres() {
  const response = await fetch(
    "https://api.themoviedb.org/3/genre/movie/list?language=en&api_key=" +
      API_KEY
  );
  const result = await response.json();
  //   console.log(result.genres);
  showGenres(result.genres);
}

async function fetchTrendingMovies() {
  const response = await fetch(
    "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&api_key=" +
      API_KEY
  );
  movieResults = await response.json();
  //   console.log(movieResults.results)
  showMovies(movieResults.results);
}

function showGenres(data) {
  data.forEach((genre) => {
    const li = document.createElement("li");
    const anchor = document.createElement("a");
    anchor.href = "/genre/" + genre.id;
    anchor.innerHTML = genre.name;
    anchor.setAttribute("onclick", "filterByGenre(event, this)");
    li.append(anchor);
    genreList.append(li);
  });
}

function showMovies(data) {
  moviesDiv.innerHTML = "";
  data.forEach((movie) => {
    const div = document.createElement("div");
    div.classList.add("movie");
    const poster = document.createElement("img");
    poster.src = img_base_path + movie.poster_path;
    const title = document.createElement("h3");
    title.innerHTML = movie.name || movie.original_title;
    div.append(poster);
    div.append(title);
    moviesDiv.append(div);
  });
}

function toggleSidebarStickyness() {
  window.onscroll = () => {
    window.scrollY > 70
      ? document.querySelector(".genreList").classList.add("sticky")
      : document.querySelector(".genreList").classList.remove("sticky");
  };
}

function filterByGenre(event, element) {
  event.preventDefault();
  let copy = movieResults.results;
  
  let output = copy.filter((movie) => {
    return movie.genre_ids.includes(Number(element.href.split("genre/")[1]));
  });
  showMovies(output)
}

fetchGenres();
fetchTrendingMovies();
window.addEventListener("scroll", toggleSidebarStickyness);
