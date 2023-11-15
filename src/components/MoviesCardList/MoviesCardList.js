import "./MoviesCardList.css";
import { useLocation } from 'react-router-dom'
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";
import { NOT_FOUND_MOVIES_ERROR } from "../../utils/constants";

function MoviesCardList({ movies, isLoading, onChangeSave, savedMovies, onDelete, firstEntrance }) {
  const { pathname } = useLocation()
  const moviesPage = pathname === '/movies';
  const savedMoviesPage = pathname === '/saved-movies';
  

  return (
    <section className={`movies-card-list ${(savedMoviesPage && firstEntrance) ? "movies-card-list_entrance" : ""} `}>
      {moviesPage && !localStorage.getItem("moviesSearchQuery") && movies.length === 0 && null}

      {moviesPage && isLoading && movies.length === 0 && <Preloader />}

      { moviesPage && movies.length === 0 && !isLoading && localStorage.getItem("moviesSearchQuery") && (
        <p className="movies-card-list__not-found">{NOT_FOUND_MOVIES_ERROR}</p>
      )}

      {savedMoviesPage && firstEntrance && null && movies.length === 0}

      {savedMoviesPage && movies.length === 0 && !firstEntrance && (
        <p className="movies-card-list__not-found">{NOT_FOUND_MOVIES_ERROR}</p>
      )}

      { movies.length !== 0 && (
        <ul className="movies-card-list__container">
          {movies.map((movie) => {
            return (
              <MoviesCard 
                key={((moviesPage && movie.id)) || (savedMoviesPage && movie._id)} 
                movie={movie} 
                onChangeSave={onChangeSave}
                savedMovies={savedMovies}
                onDelete={onDelete}
              />
            )
          })}
        </ul>
      )}
      
      {/* {moviesPage && movies.length !== 0 && (
        <ul className="movies-card-list__container">
          {movies.map((movie) => {
            return (
              <MoviesCard 
                key={movie.id} 
                movie={movie} 
                onChangeSave={onChangeSave}
                savedMovies={savedMovies}
              />
            )
          })}
        </ul>
      )}

      {savedMoviesPage && movies.length !== 0 && (
        <ul className="movies-card-list__container">
          {movies.map((movie) => {
            // console.log(movies);
            return (
              <MoviesCard 
                key={movie._id} 
                movie={movie} 
                onDelete={onDelete}
              />
            )
          })}
        </ul>
      )} */}

    </section>
  );
}

export default MoviesCardList;
