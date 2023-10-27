import "./Navigation.css";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";

function Navigation() {
  const { pathname } = useLocation();
  return (
    <nav className="navigation">
      <NavLink
        to="/"
        className={`navigation__link navigation__link_type_main ${pathname === "/"
        ? "navigation__link_active" : ""}`}
        //   pathname === "/"
        //     ? "navigation__link navigation__link_type_main navigation__link_active"
        //     : "navigation__link"
        // }
      >
        Главная
      </NavLink>
      <NavLink
        to="/movies"
        className={
          pathname === "/movies"
            ? "navigation__link navigation__link_active"
            : "navigation__link"
        }
      >
        Фильмы
      </NavLink>
      <NavLink
        to="/saved-movies"
        className={
          pathname === "/saved-movies"
            ? "navigation__link navigation__link_active"
            : "navigation__link"
        }
      >
        Сохранённые фильмы
      </NavLink>
    </nav>
  );
}

export default Navigation;
