import "./Login.css";
import AuthSection from "../AuthSection/AuthSection";
import AuthInput from "../AuthInput/AuthInput";
import useFormWithValidation from "../../hooks/useFormWithValidation";
import { EMAIL_REG } from "../../utils/constants";

function Login({ onLogin, isLoading, loginError }) {

  const { values, errors, isValid, handleChange } = useFormWithValidation();

  function handleSubmit(e) {
    e.preventDefault();
    onLogin(values.email, values.password);
  }

  return (
    <main className="login">
      <AuthSection
        title="Рады видеть!"
        name="login-form"
        buttonText="Войти"
        text="Ещё не зарегистрированы?"
        pathname="/signup"
        link="Регистрация"
        onSubmit={handleSubmit}
        isValid={isValid}
        isLoading={isLoading}
        loadingButtonText="Проверяю..."
        autoComplete="off"
        loginError={loginError}
      >
        <AuthInput
          title="E-mail"
          type="email"
          name="email"
          placeholder="Введите e-mail"
          autoComplete="off"
          pattern={EMAIL_REG}
          value={values.email || ""}
          onChange={handleChange}
          error={errors.email}
          isLoading={isLoading}
        />
        <AuthInput
          title="Пароль"
          type="password"
          name="password"
          minLength="8"
          maxLength="20"
          placeholder="Введите пароль"
          autoComplete="off"
          value={values.password || ""}
          onChange={handleChange}
          error={errors.password}
          isLoading={isLoading}
        />
      </AuthSection>
    </main>
  );
}

export default Login;
