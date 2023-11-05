import "./Movies.css";
import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import * as moviesApi from "../../utils/MoviesApi";


function Movies() {
  const { pathname } = useLocation();

    // ПОИСК ФИЛЬМОВ
  const [allMovies, setAllMovies] = useState([]);
  const [moviesForRender, setMoviesForRender] = useState([])
  const [inputSearchValue, setInputSearchValue] = useState([])
    // const [filteredMovies, setFilteredMovies] = useState([])

  // поиск и фильтрация фильмов
  const searchAndFilterMovies = useCallback((dataMovies, keyWord) => {
    const searchQuery = keyWord.toLowerCase().trim();
    const result = dataMovies.filter((movie) => {
      const searchQueryRU = movie.nameRU.toLowerCase().trim().includes(searchQuery);
      const searchQueryEN = movie.nameEN.toLowerCase().trim().includes(searchQuery);
      return (searchQueryRU || searchQueryEN);
    })
    setMoviesForRender(result)
    if (pathname === "/movies") {
      localStorage.setItem("foundMovies", JSON.stringify(result));
      localStorage.setItem("moviesSearchQuery", JSON.stringify(searchQuery));
    }
  }, [pathname])

  // запрос на получение фильмов
  const submitSearchRequest = useCallback((searchQuery) => {
  const storedAllMovies = localStorage.getItem("allMovies");
    if (!storedAllMovies) {
      moviesApi.getMovies()
        .then((dataMovies) => {
          localStorage.setItem("allMovies", JSON.stringify(dataMovies));
          setAllMovies(dataMovies);
          searchAndFilterMovies(dataMovies, searchQuery);
        })
      .catch((err) => {
        console.error(`Во время запроса произошла ошибка. Возможно, 
        проблема с соединением или сервер недоступен. Подождите 
        немного и попробуйте ещё раз`)
      })
    } 
    else { 
      setAllMovies(JSON.parse(storedAllMovies));
      searchAndFilterMovies(JSON.parse(storedAllMovies), searchQuery);
    }
  }, [searchAndFilterMovies])

  useEffect(() => {
    if (localStorage.getItem("foundMovies") && localStorage.getItem("moviesSearchQuery")) {
      const moviesFromLStorage = JSON.parse(localStorage.getItem("foundMovies"));
      const queryFromLStorage = JSON.parse(localStorage.getItem("moviesSearchQuery"));
      setMoviesForRender(moviesFromLStorage);
      setInputSearchValue(queryFromLStorage);
    }
  }, [])

  // КНОПКА ЕЩЕ
  const [count, setCount] = useState(renderMoreMovies().initial);
  const visibleMovies = moviesForRender.slice(0, count);

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
  }, [moviesForRender]);

  function openMoreMovies() {
    setCount(count + renderMoreMovies().increase);
  }

  return (
    <main className="movies">
      <SearchForm onSearch={submitSearchRequest} inputValue={inputSearchValue}/>
      <MoviesCardList movies={visibleMovies} />
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
