import "./AuthInput.css";

function AuthInput({
  title,
  type,
  name,
  minLength,
  maxLength,
  placeholder,
  autoComplete,
  pattern,
  value,
  onChange,
  error,
  isLoading,
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
        autoComplete={autoComplete}
        required
        pattern={pattern}
        value={value || ''}
        onChange={onChange}
        disabled={isLoading ? true : false}
      />
      <span className="auth-input__error">{error}</span>
    </label>
  );
}

export default AuthInput;
