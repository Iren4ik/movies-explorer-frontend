import "./SavedMovies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function SavedMovies({onDelete}) {
  return (
    <main className="saved-movies">
      <SearchForm />
      <MoviesCardList 
        // movies={visibleMovies} 
        onDelete={onDelete}
      />
    </main>
  );
}

export default SavedMovies;
