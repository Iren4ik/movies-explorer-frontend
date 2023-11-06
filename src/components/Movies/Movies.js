import "./Movies.css";
import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import * as moviesApi from "../../utils/MoviesApi";
import { search, filter } from "../../utils/utils";


function Movies() {
  const { pathname } = useLocation();

  // ПОИСК ФИЛЬМОВ
  const [allMovies, setAllMovies] = useState([]);
  const [moviesForRender, setMoviesForRender] = useState([])
  const [inputSearchValue, setInputSearchValue] = useState([])
  const [isFilterOn, setFilter] = useState(false);

  // поиск и фильтрация фильмов
  const searchAndFilterMovies = useCallback((dataMovies, keyWord, isFilterOn) => {
    const foundMovies = search(dataMovies, keyWord);
    const filteredMovies = filter(foundMovies, isFilterOn);
    setMoviesForRender(filteredMovies);
    if (pathname === "/movies") {
      localStorage.setItem("foundMovies", JSON.stringify(foundMovies));
      localStorage.setItem("moviesSearchQuery", JSON.stringify(keyWord));
      localStorage.setItem("filterState", JSON.stringify(isFilterOn));
    }
  }, [pathname])

  // запрос на получение фильмов
  const handleSubmitSearchRequest = useCallback((searchQuery) => {
  const storedAllMovies = localStorage.getItem("allMovies");
    if (!storedAllMovies) {
      moviesApi.getMovies()
        .then((dataMovies) => {
          localStorage.setItem("allMovies", JSON.stringify(dataMovies));
          setAllMovies(dataMovies);
          searchAndFilterMovies(dataMovies, searchQuery, isFilterOn);
        })
      .catch((err) => {
        console.error(`Во время запроса произошла ошибка. Возможно, 
        проблема с соединением или сервер недоступен. Подождите 
        немного и попробуйте ещё раз`)
      })
    } 
    else { 
      setAllMovies(JSON.parse(storedAllMovies));
      searchAndFilterMovies(JSON.parse(storedAllMovies), searchQuery, isFilterOn);
    }
  }, [searchAndFilterMovies, isFilterOn])

  // включение фильтрации
  const handleOnFilterClick = useCallback((isFilterOn) => {
    setFilter(isFilterOn);
    if (isFilterOn) {
      const filteredMovies = filter(moviesForRender, isFilterOn);
      setMoviesForRender(filteredMovies);
      localStorage.setItem("filteredMovies", JSON.stringify(filteredMovies));
      localStorage.setItem("filterState", JSON.stringify(isFilterOn));
    } else {
      const moviesFromLStorage = JSON.parse(localStorage.getItem("foundMovies"));
      setMoviesForRender(moviesFromLStorage);
      localStorage.setItem("filterState", JSON.stringify(isFilterOn));
    }
  }, [moviesForRender])

  useEffect(() => {
    if (
      localStorage.getItem("foundMovies") && 
      localStorage.getItem("moviesSearchQuery") && 
      localStorage.getItem("filterState") &&
      localStorage.getItem("filteredMovies")
      ) {
      const moviesFromLStorage = JSON.parse(localStorage.getItem("foundMovies"));
      const queryFromLStorage = JSON.parse(localStorage.getItem("moviesSearchQuery"));
      const filterStateFromLStorage = JSON.parse(localStorage.getItem("filterState"));
      const filteredMoviesFromLStorage = JSON.parse(localStorage.getItem("filteredMovies"));
      setFilter(filterStateFromLStorage);
      setInputSearchValue(queryFromLStorage);
      if (filterStateFromLStorage === true) {
        setMoviesForRender(filteredMoviesFromLStorage);
      } else {
        setMoviesForRender(moviesFromLStorage);
      }
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
      <SearchForm 
        onSearch={handleSubmitSearchRequest} 
        inputValue={inputSearchValue} 
        isFilterOn={isFilterOn}
        onFilterChange={handleOnFilterClick}
      />
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
