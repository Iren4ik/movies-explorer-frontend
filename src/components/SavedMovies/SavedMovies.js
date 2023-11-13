import "./SavedMovies.css";
import { useCallback, useEffect, useState } from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { search, filter } from "../../utils/utils";

function SavedMovies({onDelete, savedMovies}) {
  const [moviesForRender, setMoviesForRender] = useState(savedMovies);
  const [isFilterOn, setFilter] = useState(false);
  // const [firstEntrance, setFirstEntrance] = useState(true)
  console.log(moviesForRender);
  console.log(savedMovies);

  useEffect(() => {
    setMoviesForRender(savedMovies);
  }, [savedMovies]);

 // поиск и фильтрация фильмов
  const searchAndFilterMovies = useCallback((savedMovies, keyWord, isFilterOn) => {
    const found = search(savedMovies, keyWord);
    // console.log(found);
    const filteredMovies = filter(found, isFilterOn);
    console.log(filteredMovies);
    setMoviesForRender(filteredMovies);
  }, [])

  // Отправка запроса на поиск
  const handleSubmitSearchRequest = useCallback((searchQuery) => {
    searchAndFilterMovies(savedMovies, searchQuery, isFilterOn);
  }, [searchAndFilterMovies, savedMovies, isFilterOn]);

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
        savedMovies={savedMovies}
      />
      <MoviesCardList 
        movies={moviesForRender}
        onDelete={onDelete}
      />
    </main>
  );
}

export default SavedMovies;
