import "./Register.css";
import AuthSection from "../AuthSection/AuthSection";
import AuthInput from "../AuthInput/AuthInput";
import { useState } from "react";

function Register({ user }) {
  const [isPassword, setPassword] = useState(true);

  return (
    <main className="register">
      <AuthSection
        title="Добро пожаловать!"
        error=""
        buttonText="Зарегистрироваться"
        text="Уже зарегистрированы?"
        pathname="/signin"
        link="Войти"
      >
        <AuthInput
          title="Имя"
          type="text"
          name="name"
          minLength="2"
          maxLength="30"
          value={user.name}
          error=""
        />
        <AuthInput
          title="E-mail"
          type="email"
          name="email"
          value={user.email}
          error=""
        />
        <AuthInput
          isPassword={isPassword}
          title="Пароль"
          type="password"
          name="password"
          minLength="8"
          maxLength="20"
          value={user.password}
          error="Что-то пошло не так..."
        />
      </AuthSection>
    </main>
  );
}

export default Register;
