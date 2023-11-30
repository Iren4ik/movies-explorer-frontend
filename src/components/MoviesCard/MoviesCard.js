import "./MoviesCard.css";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { MOVIES_API_URL } from "../../utils/constants";

function MoviesCard({ movie, onChangeSave, onDelete, savedMovies }) {
  const { pathname } = useLocation();

  const [isSavedMovie, setSavedMovie] = useState(false);

  useEffect(() => {
    if (pathname === '/movies')
    setSavedMovie(savedMovies.some(element => movie.id === element.movieId))
  }, [savedMovies, movie.id, setSavedMovie, pathname])

  const handleSave = () => {
    if (savedMovies.some(element => movie.id === element.movieId)) {
      setSavedMovie(false);
      onChangeSave(movie);
    } else {
      setSavedMovie(true);
      onChangeSave(movie);
    }
  };

  const handleDelete = () => {
    onDelete(movie._id)
  }

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

      {(pathname === '/movies') && (
        <button
          className={`movies-card__btn 
            ${!isSavedMovie
              ? "movies-card__btn_type_save" 
              : "movies-card__btn_type_saved"}`}
          type="button"
          onClick={handleSave}
        >
          {!isSavedMovie ? "Сохранить" : ""}
        </button>
        )
      }

      {(pathname === '/saved-movies') && (
        <button
          className="movies-card__btn movies-card__btn_type_delete"
          type="button"
          onClick={handleDelete}
        ></button>
      )}
    </li>
  );
}

export default MoviesCard;
