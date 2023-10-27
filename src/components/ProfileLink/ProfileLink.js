import "./ProfileLink.css";
import { Link, useLocation } from "react-router-dom";

function ProfileLink() {
  const location = useLocation();
  return (
    <div className="profileLink">
      <Link to="/profile" className="profileLink__link">
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
    </div>
  );
}

export default ProfileLink;

// className={location.pathname === "/" ? "header header_pink" : "header"}
