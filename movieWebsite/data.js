export const API_KEY = "8125db8f67d23da1d30f6063b1b794b8";
export const BASE_URL = "https://api.themoviedb.org/3";
export const IMG_BASE_PATH = "https://image.tmdb.org/t/p/original/";

export const request = {
  trendingMoviesByDay: `${BASE_URL}/trending/movie/day?language=en-US&api_key=${API_KEY}`,
  trendingMoviesByWeek: `${BASE_URL}/trending/movie/week?language=en-US&api_key=${API_KEY}`,
  popularMovies: `${BASE_URL}/movie/popular?language=en-US&api_key=${API_KEY}`,
  popularTVShows: `${BASE_URL}/tv/popular?language=en-US&api_key=${API_KEY}`,
  topRatedMovies: `${BASE_URL}/movie/top_rated?language=en-US&api_key=${API_KEY}`,
  topRatedTVShows: `${BASE_URL}/tv/top_rated?language=en-US&api_key=${API_KEY}`,
};
