import "./Register.css";
import AuthSection from "../AuthSection/AuthSection";
import AuthInput from "../AuthInput/AuthInput";
import useFormWithValidation from "../../hooks/useFormWithValidation";
import { EMAIL_REG, NAME_REG } from "../../utils/constants";

function Register({ onRegister, isLoading, registerError }) {

  const { values, errors, isValid, handleChange } = useFormWithValidation();

  function handleSubmit(e) {
    e.preventDefault();
    onRegister(values.name, values.email, values.password);
  }

  return (
    <main className="register">
      <AuthSection
        title="Добро пожаловать!"
        name="register-form"
        buttonText="Зарегистрироваться"
        text="Уже зарегистрированы?"
        pathname="/signin"
        link="Войти"
        onSubmit={handleSubmit}
        isValid={isValid}
        isLoading={isLoading}
        loadingButtonText="Регистрирую..."
        autoComplete="off"
        registerError={registerError}
      >
        <AuthInput
          title="Имя"
          type="text"
          name="name"
          minLength="2"
          maxLength="30"
          placeholder="Введите имя"
          autoComplete="off"
          pattern={NAME_REG}
          value={values.name || ""}
          onChange={handleChange}
          error={errors.name}
          isLoading={isLoading}
        />
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

export default Register;
