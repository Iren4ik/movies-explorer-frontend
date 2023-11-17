import { useNavigate } from "react-router-dom";
import "./PageNotFound.css";

function PageNotFound() {
  const navigate = useNavigate();

  function handleClick() {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate("/", { replace: true });
    }
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
