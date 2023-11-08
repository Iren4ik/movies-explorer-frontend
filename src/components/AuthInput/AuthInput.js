import "./AuthInput.css";

function AuthInput({
  title,
  type,
  name,
  minLength,
  maxLength,
  placeholder,
  pattern,
  value,
  onChange,
  error,
}) {
  return (
    <label className="auth-input">
      {title}
      <input
        className={`auth-input__input ${
          error ? "auth-input__input_valid_error" : ""
        }`}
        type={type}
        name={name}
        minLength={minLength}
        maxLength={maxLength}
        placeholder={placeholder}
        required
        pattern={pattern}
        value={value || ''}
        onChange={onChange}
      />
      <span className="auth-input__error">{error}</span>
    </label>
  );
}

export default AuthInput;
