import "./Profile.css";
import { useContext, useEffect, useState } from 'react';
import useFormWithValidation from "../../hooks/useFormWithValidation";
import {
  EMAIL_REG,
  NAME_REG,
  UPDATE_PROFILE_ERROR,
  SUCCESS_NOTIFICATION,
} from "../../utils/constants";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Profile({
  onEditProfile,
  onLogout,
  onUpdate,
  isLoading,
  updateError,
  isEditingProfile,
  isNewEntranceOnPage,
  success,
}) {

  const { values, errors, isValid, handleChange, resetForm } = useFormWithValidation();
  const currentUser = useContext(CurrentUserContext);
  const [btnDisabled, setBtnDisabled] = useState(false);

  // При редактировании заполнение полей текущими данными
  useEffect(() => {
    resetForm({ name: currentUser.name, email: currentUser.email })
  }, [resetForm, currentUser, isEditingProfile]);

  //Если новые данные не измненились, кнопка не активна
  useEffect(() => {
    currentUser.name !== values.name && currentUser.email !== values.email
      ? setBtnDisabled(false)
      : setBtnDisabled(true);
  }, [currentUser, values]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdate(values);
  }
  // console.log(isEditingProfile);

  return (
    <main className="profile">
      <section className="profile__section">
        <h1 className="profile__title">Привет, {currentUser.name}!</h1>
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
                  disabled={!isEditingProfile || isNewEntranceOnPage}
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
                  disabled={!isEditingProfile || isNewEntranceOnPage}
                  pattern={EMAIL_REG}
                  value={values.email || ""}
                  onChange={handleChange}
                  required
                />
              </div>
              <span className="profile__input-error">{errors.email}</span>
            </div>
            <span className="profile__success">{success ? `${SUCCESS_NOTIFICATION}` : ''}</span>
          </div>

          <div className="profile__btns">
            <span className="profile__error">{updateError ? `${UPDATE_PROFILE_ERROR}` : ''}</span>
            {isEditingProfile && !isNewEntranceOnPage && (
              <button
                className={`profile__btn profile__btn_type_save ${!isValid || isLoading || btnDisabled ? 'profile__btn_disabled' : ''}`}
                type="submit"
                disabled={!isValid || isLoading || btnDisabled}
              >
                {!isLoading ? "Сохранить" : "Сохраняю..."}
              </button>
            )}
          </div>
        </form>

        <div className="profile__btns">
          {(isNewEntranceOnPage || !isEditingProfile) &&   (
            <button
              className="profile__btn profile__btn_type_edit"
              type="button"
              onClick={onEditProfile}
            >
              Редактировать
            </button>
          )}
          {(isNewEntranceOnPage || !isEditingProfile) &&  (
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
