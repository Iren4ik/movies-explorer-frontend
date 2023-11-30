import { 
  SHORT_FILM,
  L_SIZE_SCREEN,
  M_SIZE_SCREEN,
  S_SIZE_SCREEN,
  INIT_FOR_L_SCREEN,
  INIT_FOR_M_SCREEN,
  INIT_FOR_S_SCREEN,
  INC_FOR_L_SCREEN,
  INC_FOR_M_SCREEN,
  INC_FOR_S_SCREEN
} from "./constants";

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

export function renderMoreMovies() {
  let counter = { initial: INIT_FOR_L_SCREEN, increase: INC_FOR_L_SCREEN };
  if (window.innerWidth <= L_SIZE_SCREEN) {
    counter = { 
      initial: INIT_FOR_L_SCREEN, 
      increase: INC_FOR_L_SCREEN 
    };
  }
  if (window.innerWidth <= M_SIZE_SCREEN) {
    counter = { 
      initial: INIT_FOR_M_SCREEN, 
      increase: INC_FOR_M_SCREEN 
    };
  }
  if (window.innerWidth <= S_SIZE_SCREEN) {
    counter = { 
      initial: INIT_FOR_S_SCREEN, 
      increase: INC_FOR_S_SCREEN 
    };
  }
  return counter;
}