import "./Login.css";
import AuthSection from "../AuthSection/AuthSection";
import AuthInput from "../AuthInput/AuthInput";

function Login({ user }) {
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
      >
        <AuthInput
          title="E-mail"
          type="email"
          name="email"
          value={user.email}
          placeholder="Введите e-mail"
          error=""
        />
        <AuthInput
          title="Пароль"
          type="password"
          name="password"
          minLength="8"
          maxLength="20"
          value=""
          placeholder="Введите пароль"
          error=""
        />
      </AuthSection>
    </main>
  );
}

export default Login;
