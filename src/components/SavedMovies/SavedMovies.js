import "./SavedMovies.css";
import { useCallback, useEffect, useState } from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { search, filter } from "../../utils/utils";

function SavedMovies({onDelete, savedMovies}) {
  const [moviesForRender, setMoviesForRender] = useState(savedMovies);
  const [foundCards, setFoundCards] = useState([]);
  const [isFilterOn, setFilter] = useState(false);
  const [inputSearchValue, setInputSearchValue] = useState('');
  const [firstEntrance, setFirstEntrance] = useState(true);
  // console.log(moviesForRender);
  console.log(savedMovies);
  console.log(foundCards);
  console.log(firstEntrance);

  useEffect(() => {
    setMoviesForRender(savedMovies);
  }, [savedMovies]);

  useEffect(() => {
    if (savedMovies.length === 0) {
      setFirstEntrance(true);
    } else {
      setFirstEntrance(false);
    }
  }, [savedMovies])

 // поиск и фильтрация фильмов
  const searchAndFilterMovies = useCallback((savedMovies, keyWord, isFilterOn) => {
    setInputSearchValue(keyWord);
    const found = search(savedMovies, keyWord);
    setFoundCards(found);
    // console.log(found);
    const filteredMovies = filter(found, isFilterOn);
    // console.log(filteredMovies);
    setMoviesForRender(filteredMovies);
  }, [])

  // Отправка запроса на поиск
  const handleSubmitSearchRequest = useCallback((searchQuery) => {
    searchAndFilterMovies(savedMovies, searchQuery, isFilterOn);
  }, [searchAndFilterMovies, savedMovies, isFilterOn]);

  // включение фильтрации
  const handleOnFilterClick = useCallback((isFilterOn) => {
    setFilter(isFilterOn);
    console.log('nen');
    if (!foundCards.length) {
      if (isFilterOn) {
        const filtered = filter(savedMovies, isFilterOn);
        setMoviesForRender(filtered);
        console.log('выводим сохраненные короткометражки');
      } else {
        setMoviesForRender(savedMovies);
        console.log('выводим сохраненные все');
      }
    } else {
      if (isFilterOn) {
        const filtered = filter(foundCards, isFilterOn);
        setMoviesForRender(filtered);
        console.log('выводим короткометражки по запросу');
      } else {
        setMoviesForRender(foundCards);
        console.log('выводим запрос');
      }
    }
  }, [foundCards, savedMovies])

  // useEffect(() => {
  //   if (savedMovies.length === 0) {
  //     setFirstEntrance(true)
  //   } else {
  //     setFirstEntrance(false)
  //   }
    // searchAndFilterMovies(savedMovies, searchQuery, isFilterOn);
  // }, [])

  return (
    <main className="saved-movies">
      <SearchForm 
        onSearch={handleSubmitSearchRequest} 
        // movies={moviesForRender} 
        inputValue={inputSearchValue} 
        isFilterOn={isFilterOn}
        onFilterChange={handleOnFilterClick}
        savedMovies={savedMovies}
      />
      <MoviesCardList 
        movies={moviesForRender}
        onDelete={onDelete}
        firstEntrance={firstEntrance}
      />
    </main>
  );
}

export default SavedMovies;
