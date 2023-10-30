import "./Header.css";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import Navigation from "../Navigation/Navigation";
import ProfileLink from "../ProfileLink/ProfileLink";
import AuthLinks from "../AuthLinks/AuthLinks";
import Logo from "../Logo/Logo";

function Header({ isLoggedIn }) {
  const { pathname } = useLocation();
  const [menu, setMenu] = useState(false);

  function handleOpenMenu() {
    setMenu(!menu);
  }

  const headerMenu =
    // pathname === "/" ||
    pathname === "/movies" ||
    pathname === "/saved-movies" ||
    pathname === "/profile";

  return (
    <header className={pathname === "/" ? "header header_pink" : "header"}>
      <div className="header__container">
        <Logo />
        {isLoggedIn && headerMenu && (
          <>
            <div
              className={
                menu
                  ? "header__menu-overlay header__menu-overlay_active"
                  : "header__menu-overlay"
              }
            >
              <div
                className={
                  menu
                    ? "header__menu-wrapper header__menu-wrapper_active"
                    : "header__menu-wrapper "
                }
              >
                <div className="header__menu">
                  <Navigation onClick={handleOpenMenu} />
                  <ProfileLink onClick={handleOpenMenu}/>
                </div>
              </div>
            </div>

            <button
              className="header__burger"
              type="button"
              onClick={handleOpenMenu}
            ></button>
            <button
              className={
                menu
                  ? "header__close-btn header__close-btn_active"
                  : "header__close-btn"
              }
              type="button"
              onClick={handleOpenMenu}
            ></button>
          </>
        )}
        {isLoggedIn && pathname === "/" && <AuthLinks />}
      </div>
    </header>
  );
}

export default Header;
