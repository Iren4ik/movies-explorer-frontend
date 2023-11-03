import { Link } from "react-router-dom";
import "./PageNotFound.css";

function PageNotFound() {
  return (
    <main className="not-found">
      <section className="not-found__container">
        <p className="not-found__status">404</p>
        <h1 className="not-found__description">Страница не найдена</h1>
        <Link to="/" className="not-found__link">
          Назад
        </Link>
      </section>
    </main>
  );
}

export default PageNotFound;
