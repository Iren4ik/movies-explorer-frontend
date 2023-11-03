import "./Portfolio.css";

function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <div className="portfolio__container">
        <ul className="portfolio__list">
          <li className="portfolio__list-item">
            <a
              href="https://iren4ik.github.io/how-to-learn/"
              target="_blank"
              className="portfolio__link"
              rel="noreferrer"
            >
              <p className="portfolio__subtitle">Статичный сайт</p>
              <p className="portfolio__button">&#x2197;</p>
            </a>
          </li>
          <li className="portfolio__list-item">
            <a
              href="https://iren4ik.github.io/russian-travel/"
              target="_blank"
              className="portfolio__link"
              rel="noreferrer"
            >
              <p className="portfolio__subtitle">Адаптивный сайт</p>
              <p className="portfolio__button">&#x2197;</p>
            </a>
          </li>
          <li className="portfolio__list-item">
            <a
              href="https://github.com/Iren4ik/react-mesto-api-full-gha"
              target="_blank"
              className="portfolio__link"
              rel="noreferrer"
            >
              <p className="portfolio__subtitle">Одностраничное приложение</p>
              <p className="portfolio__button">&#x2197;</p>
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default Portfolio;
