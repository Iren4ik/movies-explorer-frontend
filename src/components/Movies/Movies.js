import "./Movies.css";
import { useCallback, useEffect, useState } from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import * as moviesApi from "../../utils/MoviesApi";
import { search, filter } from "../../utils/utils";


function Movies() {
  const [allMovies, setAllMovies] = useState([]);
  const [foundCards, setFoundCards] = useState([]);
  const [moviesForRender, setMoviesForRender] = useState([])
  const [inputSearchValue, setInputSearchValue] = useState([])
  const [isFilterOn, setFilter] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [count, setCount] = useState(renderMoreMovies().initial);

  const visibleMovies = moviesForRender.slice(0, count);

  // поиск и фильтрация фильмов
  const searchAndFilterMovies = useCallback((dataMovies, keyWord, isFilterOn) => {
    const found = search(dataMovies, keyWord);
    setFoundCards(found);
    const filteredMovies = filter(found, isFilterOn);
    setMoviesForRender(filteredMovies);
    localStorage.setItem("foundMovies", JSON.stringify(filteredMovies));
    localStorage.setItem("moviesSearchQuery", JSON.stringify(keyWord));
    localStorage.setItem("filterState", JSON.stringify(isFilterOn));
  }, [])

  // запрос на получение фильмов
  const handleSubmitSearchRequest = useCallback((searchQuery) => {
  const storedAllMovies = localStorage.getItem("allMovies");
    if (!storedAllMovies) {
      setLoading(true)
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
      .finally(() => setLoading(false))
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
      const filtered = filter(foundCards, isFilterOn);
      setMoviesForRender(filtered);
      localStorage.setItem("foundMovies", JSON.stringify(filtered));
      localStorage.setItem("filterState", JSON.stringify(isFilterOn));
  } else {
    const allMovies = JSON.parse(localStorage.getItem("allMovies"));
    const searchQuery = JSON.parse(localStorage.getItem("moviesSearchQuery"));;
    const found = search(allMovies, searchQuery);
    setMoviesForRender(found);
    localStorage.setItem("foundMovies", JSON.stringify(found));
    localStorage.setItem("filterState", JSON.stringify(isFilterOn));
  }
  }, [foundCards])

  function renderMoreMovies() {
    let counter = { initial: 12, increase: 3 };
    if (window.innerWidth <= 768) {
      counter = { initial: 8, increase: 2 };
    }
    if (window.innerWidth <= 450) {
      counter = { initial: 5, increase: 2 };
    }
    return counter;
  }

  function openMoreMovies() {
    setCount(count + renderMoreMovies().increase);
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


  useEffect(() => {
    if (
      localStorage.getItem("foundMovies") && 
      localStorage.getItem("moviesSearchQuery") &&
      localStorage.getItem("filterState")
      ) {
      const moviesFromLStorage = JSON.parse(localStorage.getItem("foundMovies"));
      const queryFromLStorage = JSON.parse(localStorage.getItem("moviesSearchQuery"));
      const filterStateFromLStorage = JSON.parse(localStorage.getItem("filterState"));
      setInputSearchValue(queryFromLStorage);
      setMoviesForRender(moviesFromLStorage);
      setFilter(filterStateFromLStorage);
    }
  }, [])

  return (
    <main className="movies">
      <SearchForm 
        onSearch={handleSubmitSearchRequest} 
        inputValue={inputSearchValue} 
        isFilterOn={isFilterOn}
        onFilterChange={handleOnFilterClick}
        isLoading={isLoading}
      />
      <MoviesCardList movies={visibleMovies} isLoading={isLoading}/>
      <div className="movies__btn-more-container">
        <button
          type="button"
          className={`movies__btn-more ${
            (count >= moviesForRender.length) &&  "movies__btn-more_hidden"
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
