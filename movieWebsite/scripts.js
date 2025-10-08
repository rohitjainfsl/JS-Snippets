import { options, config } from "./config.js";
const buttons = document.querySelectorAll(".btns button");

window.addEventListener("load", async () => {
  const result = await fetchDataFromURL(
    {
      trendingMoviesDay: config.endpoints.trendingMoviesDay,
      popularMovies: config.endpoints.popularMovies,
      topRatedMovies: config.endpoints.topRatedMovies,
    },
    options
  );
  console.log(result);

  for (let x in result) {
    config.fetchedData[x] = result[x];
  }

  console.log(config.fetchedData);
});

buttons.forEach((button) => {
  button.addEventListener("click", async (e) => {
    const id = e.target.id;
    if (config.fetchedData[id]) {
      console.log("Data already fetched");
      return;
    }
    const url = config.endpoints[id];
    const result = await fetchDataFromURL(url, options);
    config.fetchedData[id] = result.results;
    console.log(config.fetchedData);
  });
});

async function fetchDataFromURL(url, options) {
  let result;

  if (typeof url === "object") {
    const promises = [];
    for (let x in url) {
      const response = await fetch(url[x], options);
      promises.push(response.json());
    }
    // return await Promise.all(promises);
    const data = await Promise.all(promises);
    const keys = Object.keys(url);
    result = {};
    keys.forEach((key, index) => {
      result[key] = data[index].results;
    });
  } else {
    const response = await fetch(url, options);
    result = await response.json();
  }
  return result;
}
