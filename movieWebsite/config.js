const baseURL = "https://api.themoviedb.org/3";

export const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MTI1ZGI4ZjY3ZDIzZGExZDMwZjYwNjNiMWI3OTRiOCIsIm5iZiI6MTY0NzMyNzc0Ny45MzgsInN1YiI6IjYyMzAzYTAzYzNhYTNmMDAxY2M2NmNmOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7tVubnAKM0OGL0M8njpUz5TgtCUpHXXluYfn59-esVY",
  },
};
export const config = {
  endpoints: {
    trendingMoviesDay: `${baseURL}/trending/movie/day?language=en-US`,
    trendingMoviesWeek: `${baseURL}/trending/movie/day?language=en-US`,
    popularMovies: `${baseURL}/movie/popular?language=en-US&page=1`,
    popularTvshows: `${baseURL}/tv/popular?language=en-US&page=1`,
    topRatedMovies: `${baseURL}/movie/top_rated?language=en-US&page=1`,
    topRatedTvshows: `${baseURL}/tv/top_rated?language=en-US&page=1`,
    upcomingMovies: `${baseURL}/movie/upcoming?language=en-US&page=1,`,
  },
  fetchedData: {
    trendingMoviesDay: null,
    trendingMoviesWeek: null,
    popularMovies: null,
    popularTvshows: null,
    topRatedMovies: null,
    topRatedTvshows: null,
    upcomingMovies: null,
  },
};


