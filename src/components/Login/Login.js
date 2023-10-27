import "./Login.css";
import AuthSection from "../AuthSection/AuthSection";
import AuthInput from "../AuthInput/AuthInput";

function Login({ user }) {
  return (
    <main className="login">
      <AuthSection
        title="Рады видеть!"
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
          error=""
        />
        <AuthInput
          title="Пароль"
          type="password"
          name="password"
          minLength="8"
          maxLength="20"
          value=""
          error=""
        />
      </AuthSection>
    </main>
  );
}

export default Login;
