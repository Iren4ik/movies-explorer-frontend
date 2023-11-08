import "./Register.css";
import AuthSection from "../AuthSection/AuthSection";
import AuthInput from "../AuthInput/AuthInput";
import useFormWithValidation from "../../hooks/useFormWithValidation";
import { EMAIL_REG } from "../../utils/constants";

function Register({ onRegister }) {
  // const [isError, setError] = useState(true);

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
        error=""
        buttonText="Зарегистрироваться"
        text="Уже зарегистрированы?"
        pathname="/signin"
        link="Войти"
        onSubmit={handleSubmit}
        isValid={isValid}
      >
        <AuthInput
          title="Имя"
          type="text"
          name="name"
          minLength="2"
          maxLength="30"
          placeholder="Введите имя"
          value={values.name || ""}
          onChange={handleChange}
          error={errors.name}
        />
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

export default Register;
