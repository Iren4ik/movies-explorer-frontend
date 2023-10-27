import "./AuthLinks.css";
import { Link } from "react-router-dom";

function AuthLinks() {
  return (
    <div className="authLinks">
      <Link to="/signup" className="authLinks__link authLinks__link_type_link">
        Регистрация
      </Link>
      <Link to="/signin" className="authLinks__link authLinks__link_type_btn">
        Войти
      </Link>
    </div>
  );
}

export default AuthLinks;
