import { Link, useLocation } from "react-router-dom";
import "./AuthSection.css";
import Logo from "../Logo/Logo";

function AuthSection({
  title,
  name,
  children,
  error,
  buttonText,
  text,
  pathname,
  link,
  onSubmit,
  autoComplete,
  isValid,
  isLoading,
  loadingButtonText
}) {
  const location = useLocation();
  return (
    <section className="auth-section">
      <Logo />
      <h1 className="auth-section__title">{title}</h1>
      <form 
        className="auth-section__form" 
        action="#" 
        name={name} 
        noValidate
        isValid={isValid}
        onSubmit={onSubmit}
        autoComplete={autoComplete}
      >
        <div className="auth-section__input-container">{children}</div>
        <div
          className={
            location.pathname === "/signup"
              ? "auth-section__space auth-section__space_three-input"
              : "auth-section__space auth-section__space_two-input"
          }
        >
          <span className="auth-section__error">
            
          </span>
          <button 
            type="submit" 
            className={`auth-section__btn ${!isValid || isLoading ? 'auth-section__btn_disabled' : ''}`}
            disabled={!isValid || isLoading}
          >
            {!isLoading ? `${buttonText}` : `${loadingButtonText}`}
          </button>
          <p className="auth-section__text">
            {`${text} `}
            <Link to={pathname} className="auth-section__link">
              {` ${link}`}
            </Link>
          </p>
        </div>
      </form>
    </section>
  );
}

export default AuthSection;
