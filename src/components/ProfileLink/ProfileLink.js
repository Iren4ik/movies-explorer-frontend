import "./ProfileLink.css";
import { Link, useLocation } from "react-router-dom";

function ProfileLink({ onClick }) {
  const location = useLocation();
  return (
    <nav className="profileLink">
      <Link to="/profile" className="profileLink__link" onClick={onClick}>
        Аккаунт
        <div
          className={
            location.pathname === "/"
              ? "profileLink__icon-container profileLink__icon-container_black"
              : "profileLink__icon-container profileLink__icon-container_grey"
          }
        >
          <div
            className={
              location.pathname === "/"
                ? "profileLink__icon profileLink__icon_pink"
                : "profileLink__icon profileLink__icon_black"
            }
          ></div>
        </div>
      </Link>
    </nav>
  );
}

export default ProfileLink;
