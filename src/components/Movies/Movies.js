import "./Movies.css";
import { useCallback, useEffect, useState } from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import * as moviesApi from "../../utils/MoviesApi";


function Movies() {
    // Функционал для поиска
  const [allMovies, setAllMovies] = useState([]);
  // const [movies, setMovies] = useState([]);ы
  const [filteredMovies, setFilteredMovies] = useState([])

  const filter = useCallback((dataMovies, keyWord) => {
    setFilteredMovies(dataMovies.filter((movie) => {
      const searchQueryRU = movie.nameRU.toLowerCase().trim().includes(keyWord.toLowerCase().trim());
      const searchQueryEN = movie.nameEN.toLowerCase().trim().includes(keyWord.toLowerCase().trim());
      return (searchQueryRU || searchQueryEN);
    }))
  }, [])

  //Запрос на получение фильмов
  const hundleSearchSubmit = useCallback((searchQuery) => {
    if (!allMovies.length) {
      moviesApi.getMovies()
        .then((dataMovies) => {
          setAllMovies(dataMovies)
          filter(dataMovies, searchQuery)
        })
      .catch((err) => {
        console.error(`Во время запроса произошла ошибка. Возможно, 
        проблема с соединением или сервер недоступен. Подождите 
        немного и попробуйте ещё раз`)
      })
    } 
    else { 
      filter(allMovies, searchQuery)
    }
  }, [filter, allMovies])

  //Функционал кнопки ЕЩЕ
  const [count, setCount] = useState(renderMoreMovies().initial);
  const moviesForRender = filteredMovies.slice(0, count);

  function renderMoreMovies() {
    let counter = { initial: 12, increase: 4 };
    if (window.innerWidth <= 768) {
      counter = { initial: 8, increase: 4 };
    }
    if (window.innerWidth <= 450) {
      counter = { initial: 5, increase: 2 };
    }
    return counter;
  }

  useEffect(() => {
    setCount(renderMoreMovies().initial);
    function reRenderMovies() {
      if (window.innerWidth > 1280) {
        setCount(renderMoreMovies().initial);
      }
      if (window.innerWidth <= 1280) {
        setCount(renderMoreMovies().initial);
      }
      if (window.innerWidth <= 768) {
        setCount(renderMoreMovies().initial);
      }
      if (window.innerWidth <= 450) {
        setCount(renderMoreMovies().initial);
      }
    }
    window.addEventListener("resize", reRenderMovies);
    return () => window.removeEventListener("resize", reRenderMovies);
  }, [filteredMovies]);

  function openMoreMovies() {
    setCount(count + renderMoreMovies().increase);
  }

  return (
    <main className="movies">
      <SearchForm onSearch={hundleSearchSubmit}/>
      <MoviesCardList movies={moviesForRender} />
      <div className="movies__btn-more-container">
        <button
          type="button"
          className={`movies__btn-more ${
            count >= allMovies.length && "movies__btn-more_hidden"
          }`}
          onClick={openMoreMovies}
        >
          Ещё
        </button>
      </div>
    </main>
  );
}

export default Movies;
