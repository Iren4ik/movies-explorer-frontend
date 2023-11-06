import "./Movies.css";
import { useCallback, useEffect, useState } from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import * as moviesApi from "../../utils/MoviesApi";
import { search, filter } from "../../utils/utils";


function Movies() {
  const [allMovies, setAllMovies] = useState([]);
  const [moviesForRender, setMoviesForRender] = useState([])
  const [inputSearchValue, setInputSearchValue] = useState([])
  const [isFilterOn, setFilter] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [count, setCount] = useState(renderMoreMovies().initial);

  const visibleMovies = moviesForRender.slice(0, count);

  // поиск и фильтрация фильмов
  const searchAndFilterMovies = useCallback((dataMovies, keyWord, isFilterOn) => {
    // ищем фильмы по ключевым словам
    const foundMovies = search(dataMovies, keyWord);
    // и фильтруем их, если нажат фильтр
    // если фильм не нажат, вернется foundMovies
    const filteredMovies = filter(foundMovies, isFilterOn);
    // рендерим полученные фильмы
    setMoviesForRender(filteredMovies);
    // запишем запрос в localStorage
    localStorage.setItem("foundMovies", JSON.stringify(foundMovies));
    localStorage.setItem("moviesSearchQuery", JSON.stringify(keyWord));
    localStorage.setItem("filterState", JSON.stringify(isFilterOn));
  }, [])

  // запрос на получение фильмов
  const handleSubmitSearchRequest = useCallback((searchQuery) => {
  const storedAllMovies = localStorage.getItem("allMovies");
  //проверяю, загружены ли уже фильмы в localStorage
  // если нетБ то делаю запрос на сервер
    if (!storedAllMovies) {
      setLoading(true)
      moviesApi.getMovies()
        .then((dataMovies) => {
          // полученные фильмы сохраняю в localStorage
          localStorage.setItem("allMovies", JSON.stringify(dataMovies));
          setAllMovies(dataMovies);
          // ищу фильмы по ключеым словам и с учетом фильтра
          searchAndFilterMovies(dataMovies, searchQuery, isFilterOn);
        })
      .catch((err) => {
        console.error(`Во время запроса произошла ошибка. Возможно, 
        проблема с соединением или сервер недоступен. Подождите 
        немного и попробуйте ещё раз`)
      })
      .finally(() => setLoading(false))
    } 
    // если фильмы есть в localStorage
    else { 
      setAllMovies(JSON.parse(storedAllMovies));
      // ищу среди них
      searchAndFilterMovies(JSON.parse(storedAllMovies), searchQuery, isFilterOn);
    }
  }, [searchAndFilterMovies, isFilterOn])

  // включение фильтрации
  const handleOnFilterClick = useCallback((isFilterOn) => {
    setFilter(isFilterOn);
    // если фильтр нажат, происходит фильтрация
    if (isFilterOn) {
      const filteredMovies = filter(moviesForRender, isFilterOn);
      // рендерим отфильтрованные фильмы
      setMoviesForRender(filteredMovies);
      //сохраняем запрос с учетом фильтра в localStorage
      localStorage.setItem("filteredMovies", JSON.stringify(filteredMovies));
      localStorage.setItem("filterState", JSON.stringify(isFilterOn));
    // если отключаем фильтр
    } else {
      // выводим карточки из запроса до включения фильтра
      const moviesFromLStorage = JSON.parse(localStorage.getItem("foundMovies"));
      setMoviesForRender(moviesFromLStorage);
      localStorage.setItem("filterState", JSON.stringify(isFilterOn));  
    }
  }, [moviesForRender])

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
      localStorage.getItem("moviesSearchQuery") && 
      localStorage.getItem("filterState") 
      // &&
      // (localStorage.getItem("foundMovies") || 
      // localStorage.getItem("filteredMovies"))
      ) {
      // const moviesFromLStorage = JSON.parse(localStorage.getItem("foundMovies"));
      const queryFromLStorage = JSON.parse(localStorage.getItem("moviesSearchQuery"));
      const filterStateFromLStorage = JSON.parse(localStorage.getItem("filterState"));
      // const filteredMoviesFromLStorage = JSON.parse(localStorage.getItem("filteredMovies"));
      setInputSearchValue(queryFromLStorage);
      setFilter(filterStateFromLStorage);
      
      if (localStorage.getItem("foundMovies")) {
        const moviesFromLStorage = JSON.parse(localStorage.getItem("foundMovies"));
        setMoviesForRender(moviesFromLStorage);
      } else if (localStorage.getItem("filteredMovies")) {
        const filteredMoviesFromLStorage = JSON.parse(localStorage.getItem("filteredMovies"));
        setMoviesForRender(filteredMoviesFromLStorage);
      }

      // searchAndFilterMovies()
      // if (filterStateFromLStorage === true) {
      //   setMoviesForRender(filteredMoviesFromLStorage);
      // }
      // setInputSearchValue(queryFromLStorage);
      // searchAndFilterMovies(queryFromLStorage);
      // setMoviesForRender(moviesFromLStorage);
      // if (filterStateFromLStorage === true) {
        // setMoviesForRender(filteredMoviesFromLStorage);
      // } else {
      //   setMoviesForRender(moviesFromLStorage);
      // }
    }
  }, [])

  // useEffect(() => {
  //   if (
  //     localStorage.getItem("foundMovies") && 
  //     localStorage.getItem("moviesSearchQuery")
  //     ) {
  //     const moviesFromLStorage = JSON.parse(localStorage.getItem("foundMovies"));
  //     const queryFromLStorage = JSON.parse(localStorage.getItem("moviesSearchQuery"));
  //     setInputSearchValue(queryFromLStorage);
  //     setMoviesForRender(moviesFromLStorage);
  //   }
  // }, [])

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
