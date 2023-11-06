import "./MoviesCard.css";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { MOVIES_API_URL } from "../../utils/constants";

function MoviesCard({ movie }) {
  const { pathname } = useLocation();
  const moviesPage = pathname === "/movies";
  const savedMoviesPage = pathname === "/saved-movies";

  const [isSavedMovie, setSavedMovie] = useState(false);

  const handleClickSaveMovie = () => {
    setSavedMovie(!isSavedMovie);
  };

  const convertDuration = (duration) => {
    const minutes = duration % 60;
    const hours = Math.floor(duration / 60);
    if (hours < 1) {
      return `${minutes}м`;
    } else {
      return `${hours}ч ${minutes}м`;
    }
  }

  return (
    <li className="movies-card">
      <a
        className="movies-card__link"
        href={movie.trailerLink}
        target="_blank"
        rel="noreferrer"
      >
        <img
          className="movies-card__img"
          src={
            pathname === "/movies"
              ? `${MOVIES_API_URL}${movie.image.url}`
              : `${movie.image}`
          }
          alt={`Заставка для фильма "${movie.nameRU}"`}
        />
        <div className="movies-card__caption">
          <h2 className="movies-card__title">{movie.nameRU}</h2>
          <div className="movies-card__duration-wrapper">
            <p className="movies-card__duration">{convertDuration(movie.duration)}</p>
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
