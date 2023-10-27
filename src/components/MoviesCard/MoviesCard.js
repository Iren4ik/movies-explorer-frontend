import "./MoviesCard.css";
import { useLocation } from "react-router-dom";
import { useState } from "react";

function MoviesCard({ movie }) {
  const { pathname } = useLocation();
  const moviesPage = pathname === "/movies";
  const savedMoviesPage = pathname === "/saved-movies";

  const [isSavedMovie, setSavedMovie] = useState(false);

  const handleClickSaveMovie = () => {
    setSavedMovie(!isSavedMovie);
  };

  return (
    <li className="movies-card">
      <a className="movies-card__link" href={movie.trailerLink} target="_blank" rel="noreferrer">
        <img
          className="movies-card__img"
          src={movie.link}
          alt={`Заставка для фильма "${movie.name}"`}
        />
        <div className="movies-card__caption">
          <p className="movies-card__title">{movie.name}</p>
          <div className="movies-card__duration-wrapper">
            <p className="movies-card__duration">{movie.duration}</p>
          </div>
        </div>
      </a>
      {moviesPage && !isSavedMovie && (
        <button
          className="movies-card__btn movies-card__btn_type_save"
          type="button"
          onClick={handleClickSaveMovie}
        >
          Сохранить
        </button>
      )}
      {isSavedMovie && (
        <button
          className="movies-card__btn movies-card__btn_type_saved"
          type="button"
          onClick={handleClickSaveMovie}
        ></button>
      )}
      {savedMoviesPage && (
        <button
          className="movies-card__btn movies-card__btn_type_delete"
          type="button"
        ></button>
      )}
    </li>
  );
}

export default MoviesCard;
