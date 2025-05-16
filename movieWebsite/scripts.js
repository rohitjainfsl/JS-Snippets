import { request, IMG_BASE_PATH } from "./data.js";
const trendingSection = document.querySelector("#trending");
const popularSection = document.querySelector("#popular");
const topRatedSection = document.querySelector("#topRated");

// Map for initial and toggled data
const sectionConfig = {
  trending: {
    section: trendingSection,
    toggler: ["Day", "Week"],
    requests: ["trendingMoviesByDay", "trendingMoviesByWeek"],
    current: 0,
  },
  popular: {
    section: popularSection,
    toggler: ["Movies", "TV Shows"],
    requests: ["popularMovies", "popularTVShows"],
    current: 0,
  },
  topRated: {
    section: topRatedSection,
    toggler: ["Movies", "TV Shows"],
    requests: ["topRatedMovies", "topRatedTVShows"],
    current: 0,
  },
};

// Simple cache for fetched data
const dataCache = {};

window.addEventListener("load", async () => {
  // Fetch only the first (default) dataset for each section
  for (const key in sectionConfig) {
    const reqKey = sectionConfig[key].requests[0];
    const data = await fetchDataFromURL(request[reqKey]);
    dataCache[reqKey] = data.results;
    renderMovies(sectionConfig[key].section, data.results);
    setupToggler(key);
  }
});

function setupToggler(sectionKey) {
  const config = sectionConfig[sectionKey];
  const toggler = config.section.querySelector(".toggler");
  if (!toggler) return;
  toggler.querySelectorAll("button").forEach((btn, idx) => {
    btn.addEventListener("click", async () => {
      if (config.current === idx) return; // Already showing
      config.current = idx;
      const reqKey = config.requests[idx];
      if (!dataCache[reqKey]) {
        const data = await fetchDataFromURL(request[reqKey]);
        dataCache[reqKey] = data.results;
      }
      clearMovies(config.section);
      renderMovies(config.section, dataCache[reqKey]);
    });
  });
}

function renderMovies(section, movies) {
  const wrapper = section.querySelector(".movieWrapper");
  if (!wrapper) return;
  wrapper.innerHTML = ""; // Clear any skeletons or previous content

  // Show skeletons first
  for (let i = 0; i < movies.length; i++) {
    const skeleton = document.createElement("div");
    skeleton.classList.add("movieBox", "skeleton");
    wrapper.appendChild(skeleton);
  }

  // Preload images, then replace skeletons
  Promise.all(
    movies.map(
      (obj) =>
        new Promise((resolve) => {
          const img = new Image();
          img.src = IMG_BASE_PATH + obj.poster_path;
          img.onload = () => resolve({ img, obj });
          img.onerror = () => resolve({ img, obj });
        })
    )
  ).then((loaded) => {
    wrapper.innerHTML = "";
    loaded.forEach(({ img, obj }) => {
      const div = document.createElement("div");
      div.classList.add("movieBox");
      img.alt = obj.title || obj.name || "";
      div.append(img);
      wrapper.append(div);
    });
  });

  // const fragment = document.createDocumentFragment();
  // movies.forEach((obj) => {
  //   const div = document.createElement("div");
  //   const image = document.createElement("img");
  //   div.classList.add("movieBox");
  //   image.src = IMG_BASE_PATH + obj.poster_path;
  //   div.append(image);
  //   fragment.append(div);
  // });
  // wrapper.append(fragment);
}

function clearMovies(section) {
  const wrapper = section.querySelector(".movieWrapper");
  if (wrapper) wrapper.innerHTML = "";
}

async function fetchDataFromURL(url) {
  const response = await fetch(url);
  const result = await response.json();
  return result;
}
