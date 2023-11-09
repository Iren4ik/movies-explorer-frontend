
// import { useState } from "react";
import "./Profile.css";
import useFormWithValidation from "../../hooks/useFormWithValidation";
import { EMAIL_REG, NAME_REG, UPDATE_PROFILE_ERROR } from "../../utils/constants";

function Profile({ user, onEditProfile, onLogout, onUpdate, isLoading, updateError, isEditingProfile }) {
  // const [isEditingProfile, setEditingProfile] = useState(false);

  const { values, errors, isValid, handleChange, resetForm } = useFormWithValidation();

  function handleSubmit(e) {
    e.preventDefault();
    onUpdate(values);
  }

  // function handleClickEditProfile() {
  //   setEditingProfile(true);
  // };

  return (
    <main className="profile">
      <section className="profile__section">
        <h1 className="profile__title">Привет, {user.name}!</h1>
        <form 
          className="profile__form" 
          name="edit-profile" 
          action="#" 
          onSubmit={handleSubmit}
          disabled={!isValid}
        >
          <div className="profile__info">
            <div className="profile__info-wrapper profile__info-wrapper_type_name">
              <div className="profile__input-wrapper">
                <label className="profile__input-container " htmlFor="name">
                  Имя
                </label>
                <input
                  className="profile__text profile__text_input"
                  type="text"
                  name="name"
                  placeholder="Введите имя"
                  minLength="2"
                  maxLength="30"
                  disabled={!isEditingProfile}
                  pattern={NAME_REG}
                  value={values.name || ""}
                  onChange={handleChange}
                  required
                />
              </div>
              <span className="profile__input-error">{errors.name}</span>
            </div>
            
            <div className="profile__info-wrapper profile__info-wrapper_type_email">
              <div className="profile__input-wrapper">
                <label className="profile__input-container" htmlFor="email">
                  E-mail
                </label>
                <input
                  className="profile__text profile__text_input"
                  type="email"
                  name="email"
                  placeholder="Укажите e-mail"
                  disabled={!isEditingProfile}
                  pattern={EMAIL_REG}
                  value={values.email || ""}
                  onChange={handleChange}
                  required
                />
              </div>
              <span className="profile__input-error">{errors.email}</span>
            </div>
          </div>

          <div className="profile__btns">
            <span className="profile__error">{updateError ? `${UPDATE_PROFILE_ERROR}` : ''}</span>
            {isEditingProfile && (
              <button
                className={`profile__btn profile__btn_type_save ${!isValid || isLoading ? 'profile__btn_disabled' : ''}`}
                type="submit"
                disabled={!isValid || isLoading}
              >
                {!isLoading ? "Сохранить" : "Сохраняю..."}
              </button>
            )}
          </div>
        </form>

        <div className="profile__btns">
          {!isEditingProfile && (
            <button
              className="profile__btn profile__btn_type_edit"
              type="button"
              onClick={onEditProfile}
            >
              Редактировать
            </button>
          )}
          {!isEditingProfile && (
            <button
              onClick={onLogout}
              className="profile__btn profile__btn_type_logout"
            >
              Выйти из аккаунта
            </button>
          )}
        </div>
      </section>
    </main>
  );
}

export default Profile;
