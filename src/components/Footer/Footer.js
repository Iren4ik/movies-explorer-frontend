import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__text">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </p>
      <div className="footer__container">
        <p className="footer__year">&copy; {new Date().getFullYear()}</p>
        <ul className="footer__nav">
          <li className="footer__nav-item">
            <a
              href="https://practicum.yandex.ru/"
              target="_blank"
              className="footer__nav-link"
              rel="noreferrer"
            >
              Яндекс.Практикум
            </a>
          </li>
          <li className="footer__nav-item">
            <a
              href="https://github.com/Iren4ik"
              target="_blank"
              className="footer__nav-link"
              rel="noreferrer"
            >
              Github
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
