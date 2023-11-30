import { useNavigate } from "react-router-dom";
import "./PageNotFound.css";

function PageNotFound() {
  const navigate = useNavigate();

  function handleClick() {
    navigate(-1);
  }

  return (
    <main className="not-found">
      <section className="not-found__container">
        <p className="not-found__status">404</p>
        <h1 className="not-found__description">Страница не найдена</h1>
        <button onClick={handleClick} className="not-found__link">
          Назад
        </button>
      </section>
    </main>
  );
}

export default PageNotFound;
