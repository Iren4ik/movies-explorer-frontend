import "./Login.css";
import AuthSection from "../AuthSection/AuthSection";
import AuthInput from "../AuthInput/AuthInput";
import useFormWithValidation from "../../hooks/useFormWithValidation";
import { EMAIL_REG } from "../../utils/constants";

function Login({ user, onLogin }) {

  const { values, errors, isValid, handleChange } = useFormWithValidation();

  function handleSubmit(e) {
    e.preventDefault();
    onLogin(values.name, values.email, values.password);
  }

  return (
    <main className="login">
      <AuthSection
        title="Рады видеть!"
        name="login-form"
        error="При авторизации произошла ошибка. Токен не передан 
        или передан не в том формате."
        buttonText="Войти"
        text="Ещё не зарегистрированы?"
        pathname="/signup"
        link="Регистрация"
        onSubmit={handleSubmit}
        isValid={isValid}
        novalidate
      >
        <AuthInput
          title="E-mail"
          type="email"
          name="email"
          placeholder="Введите e-mail"
          pattern={EMAIL_REG}
          value={values.email || ""}
          onChange={handleChange}
          error={errors.email}
        />
        <AuthInput
          title="Пароль"
          type="password"
          name="password"
          minLength="8"
          maxLength="20"
          placeholder="Введите пароль"
          value={values.password || ""}
          onChange={handleChange}
          error={errors.password}
        />
      </AuthSection>
    </main>
  );
}

export default Login;
