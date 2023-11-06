import { SHORT_FILM } from "./constants";

export function search(movies, keyWord) {
  const searchQuery = keyWord.toLowerCase().trim();
  const foundMovies = movies.filter((movie) => {
    const searchQueryRU = movie.nameRU.toLowerCase().trim().includes(searchQuery);
    const searchQueryEN = movie.nameEN.toLowerCase().trim().includes(searchQuery);
    return (searchQueryRU || searchQueryEN);
  })
  return foundMovies;
}

export function filter(movies, isFilterOn) {
  if (isFilterOn) {
    const filteredMovies = movies.filter((movie) => movie.duration <= SHORT_FILM);
    return filteredMovies;
  } else {
    return movies;
  }
}