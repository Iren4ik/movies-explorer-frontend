import "./Movies.css";
import { useEffect, useState } from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function Movies({ movies }) {
  const [count, setCount] = useState(renderMoreMovies().initial);
  const moviesForRender = movies.slice(0, count);

  function renderMoreMovies() {
    let counter = { initial: 12, increase: 4 };
    if (window.innerWidth <= 768) {
      counter = { initial: 8, increase: 4 };
    }
    if (window.innerWidth <= 450) {
      counter = { initial: 4, increase: 2 };
    }
    return counter;
  }

  useEffect(() => {
    setCount(renderMoreMovies().initial);
    function reRenderMovies() {
      if (window.innerWidth > 1280) {
        setCount(renderMoreMovies().initial);
      }
      if (window.innerWidth <= 1280) {
        setCount(renderMoreMovies().initial);
      }
      if (window.innerWidth <= 768) {
        setCount(renderMoreMovies().initial);
      }
      if (window.innerWidth <= 450) {
        setCount(renderMoreMovies().initial);
      }
    }
    window.addEventListener("resize", reRenderMovies);
    return () => window.removeEventListener("resize", reRenderMovies);
  }, [movies]);

  function openMoreMovies() {
    setCount(count + renderMoreMovies().increase);
  }

  return (
    <main className="movies">
      <SearchForm />
      <MoviesCardList movies={moviesForRender} />
      <div className="movies__btn-more-container">
        <button
          className={`movies__btn-more ${
            count >= movies.length && "movies__btn-more_hidden"
          }`}
          onClick={openMoreMovies}
        >
          Ещё
        </button>
      </div>
    </main>
  );
}

export default Movies;
