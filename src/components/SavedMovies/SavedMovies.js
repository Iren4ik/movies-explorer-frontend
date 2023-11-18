import "./SavedMovies.css";
import { useCallback, useEffect, useState } from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { search, filter } from "../../utils/utils";

function SavedMovies({ onDelete, savedMovies }) {
  const [moviesForRender, setMoviesForRender] = useState(savedMovies);
  const [foundCards, setFoundCards] = useState([]);
  const [isFilterOn, setFilter] = useState(false);
  const [inputSearchValue, setInputSearchValue] = useState("");
  const [firstSavedEntrance, setFirstSavedEntrance] = useState(true);
  console.log(foundCards);
  console.log(inputSearchValue);

  useEffect(() => {
      setMoviesForRender(savedMovies);
  }, [savedMovies]);

  useEffect(() => {
    if (savedMovies.length === 0) {
      setFirstSavedEntrance(true);
    } else {
      setFirstSavedEntrance(false);
    }
  }, [savedMovies]);

  // поиск и фильтрация фильмов
  const searchAndFilterMovies = useCallback(
    (savedMovies, keyWord, isFilterOn) => {
      setInputSearchValue(keyWord);
      const found = search(savedMovies, keyWord);
      setFoundCards(found);
      const filteredMovies = filter(found, isFilterOn);
      setMoviesForRender(filteredMovies);
    },
    [],
  );

  // Отправка запроса на поиск
  const handleSubmitSearchRequest = useCallback(
    (searchQuery) => {
      setFirstSavedEntrance(false);
      searchAndFilterMovies(savedMovies, searchQuery, isFilterOn);
    },
    [searchAndFilterMovies, savedMovies, isFilterOn],
  );

  // включение фильтрации
  const handleOnFilterClick = useCallback(
    (isFilterOn) => {
      setFilter(isFilterOn);
      if (!foundCards.length) {
        if (!inputSearchValue) {
          const filtered = filter(savedMovies, isFilterOn);
          setMoviesForRender(filtered);
        }
      } else {
        if (isFilterOn) {
          const filtered = filter(foundCards, isFilterOn);
          setMoviesForRender(filtered);
        } else {
          setMoviesForRender(foundCards);
        }
      }
    },
    [foundCards, savedMovies, inputSearchValue],
  );

  useEffect(() => {
    if (foundCards.length) {
      searchAndFilterMovies(savedMovies, inputSearchValue, isFilterOn);
    }
  }, [savedMovies, foundCards.length, inputSearchValue, isFilterOn, searchAndFilterMovies]);

  return (
    <main className="saved-movies">
      <SearchForm
        onSearch={handleSubmitSearchRequest}
        inputValue={inputSearchValue}
        isFilterOn={isFilterOn}
        onFilterChange={handleOnFilterClick}
        savedMovies={savedMovies}
      />
      <MoviesCardList
        movies={moviesForRender}
        onDelete={onDelete}
        firstSavedEntrance={firstSavedEntrance}
      />
    </main>
  );
}

export default SavedMovies;
