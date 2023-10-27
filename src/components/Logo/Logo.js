import "./Logo.css";
import { Link } from "react-router-dom";

function Logo() {
  return (
    <Link to="/" className="logo">
      <div className="logo__icon"></div>
    </Link>
  );
}

export default Logo;
