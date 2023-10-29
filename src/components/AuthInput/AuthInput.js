import "./AuthInput.css";

function AuthInput({
  isError,
  title,
  type,
  name,
  minLength,
  maxLength,
  value,
  placeholder,
  error,
}) {
  return (
    <label className="auth-input__container">
      <p className="auth-input__caption">{title}</p>
      <input
        className={`auth-input__input ${
          isError
            ? "auth-input__input_valid_error"
            : ""
        }`}
        type={type}
        name={name}
        minLength={minLength}
        maxLength={maxLength}
        value={value}
        required
      />
      <span className="auth-input__error">{error}</span>
      {/* <span className="auth-input__error auth-input__error_hidden">{error}</span> */}
    </label>
  );
}

export default AuthInput;
