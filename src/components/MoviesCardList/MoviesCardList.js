import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";

function MoviesCardList({ movies, isLoading }) {
  return (
    <section className="movies-card-list">
      {!localStorage.getItem("moviesSearchQuery") && movies.length === 0 && null}

      {isLoading && movies.length === 0 && <Preloader />}

      {movies.length === 0 && !isLoading && localStorage.getItem("moviesSearchQuery") && (
        <p className="movies-card-list__not-found">Ничего не найдено</p>
      )}
      
      {movies.length !== 0 && (
        <ul className="movies-card-list__container">
          {movies.map((movie) => {
            return <MoviesCard key={movie.id} movie={movie} />;
          })}
        </ul>
      )}
    </section>
  );
}

export default MoviesCardList;
