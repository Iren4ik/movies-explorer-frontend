import "./MoviesCardList.css";
import { useLocation } from 'react-router-dom'
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";
import { NOT_FOUND_MOVIES_ERROR } from "../../utils/constants";

function MoviesCardList({ movies, isLoading, onChangeSave, savedMovies, onDelete }) {
  const { pathname } = useLocation()
  return (
    <section className="movies-card-list">
      {!localStorage.getItem("moviesSearchQuery") && movies.length === 0 && null}

      {isLoading && movies.length === 0 && <Preloader />}

      {movies.length === 0 && !isLoading && localStorage.getItem("moviesSearchQuery") && (
        <p className="movies-card-list__not-found">{NOT_FOUND_MOVIES_ERROR}</p>
      )}
      
      {pathname === '/movies' && movies.length !== 0 && (
        <ul className="movies-card-list__container">
          {movies.map((movie) => {
            return (
              <MoviesCard 
                key={movie.id} 
                movie={movie} 
                onChangeSave={onChangeSave}
                onDelete={onDelete}
                savedMovies={savedMovies}
              />
            )
          })}
        </ul>
      )}

      {pathname === '/saved-movies' && movies.length !== 0 && (
        <ul className="movies-card-list__container">
          {movies.map((movie) => {
            return (
              <MoviesCard 
                key={movie._id} 
                movie={movie} 
                onDelete={onDelete}
              />
            )
          })}
        </ul>
      )}
    </section>
  );
}

export default MoviesCardList;
