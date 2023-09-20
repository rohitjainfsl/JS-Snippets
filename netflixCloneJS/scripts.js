const API_KEY = "8125db8f67d23da1d30f6063b1b794b8";
const img_base_path = "https://image.tmdb.org/t/p/original";
const moviesDiv = document.querySelector("#movies .movie-wrapper");
const genreList = document.querySelector(".genreList ul");
const modal = document.querySelector(".modal");
const iframeWrapper = document.querySelector(".iframe-wrapper");
const closeModal = document.querySelector(".close-modal");
const paging = document.querySelector(".paging");
let movieResults = "";

async function fetchGenres() {
  const response = await fetch(
    "https://api.themoviedb.org/3/genre/movie/list?language=en&api_key=" +
      API_KEY
  );
  const result = await response.json();
  showGenres(result.genres);
}

async function fetchTrendingMovies() {
  // console.log(window.location)
  const url = new URLSearchParams(window.location.href);
  
  // for (const p of url) {
  //   console.log(p);
  // }
  let response;
  if (url[0].includes("page") && Number(url[1]) !== "") {
    response = await fetch(
      "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=" +
        page +
        "&sort_by=popularity.desc&api_key=" +
        API_KEY
    );
  }
  else{
    response = await fetch(
      "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&api_key=" +
        API_KEY
    );
  }
  
  movieResults = await response.json();
  if (paging.childElementCount === 0) {
    movieResults.total_pages > 100
      ? createPaging(100)
      : createPaging(movieResults.total_pages);
  }
  // console.log(movieResults.results)
  showMovies(movieResults.results);
}

function createPaging(limit) {
  for (let i = 1; i <= limit; i++) {
    const pages = document.createElement("a");
    pages.innerHTML = i;
    pages.classList.add("page");
    if (i === 1) pages.classList.add("active");
    pages.href = "?page=" + i;
    pages.setAttribute("target", "_parent");
    pages.setAttribute("onclick", "nextPage(event, this)");
    paging.append(pages);
  }
}

function nextPage(event, elem) {
  // event.preventDefault();
  fetchTrendingMovies(elem.innerHTML);
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
    const anchor = document.createElement("a");
    anchor.href = "/trailer/" + movie.id;
    anchor.classList.add("trailer-link");
    anchor.innerHTML = "Watch Trailer";
    anchor.setAttribute("onclick", "watchTrailer(event, this)");
    div.append(anchor);
    div.append(poster);
    div.append(title);
    moviesDiv.append(div);
  });
}

async function watchTrailer(event, element) {
  event.preventDefault();
  const movieId = element.href.split("trailer/")[1];
  const response = await fetch(
    "https://api.themoviedb.org/3/movie/" +
      movieId +
      "/videos?language=en-US&api_key=" +
      API_KEY
  );
  const result = await response.json();
  const trailerObject = result.results.find((resource) => {
    return resource.site === "YouTube" && resource.type === "Trailer";
  });
  const iframe = document.createElement("iframe");
  iframe.src = "https://youtube.com/embed/" + trailerObject.key;
  modal.style.display = "flex";

  if (iframeWrapper.childElementCount > 1) {
    for (let i = 0; i < iframeWrapper.childElementCount; i++) {
      if (i > 0) iframeWrapper.children[i].remove();
    }
  }
  iframeWrapper.append(iframe);
}

function closeTrailer() {
  iframeWrapper.querySelector("iframe").src = "";
  modal.style.display = "none";
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
  showMovies(output);
}

fetchGenres();
fetchTrendingMovies();
window.addEventListener("scroll", toggleSidebarStickyness);

closeModal.addEventListener("click", closeTrailer);
