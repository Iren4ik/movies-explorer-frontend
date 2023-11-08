
import { useState } from "react";
import "./Profile.css";

function Profile({ user, onLogout }) {
  const [isEditProfile, setEditProfile] = useState(false);

  const handleClickEditProfile = () => {
    setEditProfile(true);
  };

  const handleClickSaveProfile = () => {
    setEditProfile(false);
  };

  return (
    <main className="profile">
      <section className="profile__section">
        <h1 className="profile__title">Привет, {user.name}!</h1>
        <form className="profile__form" name="edit-profile" action="#">
          <div className="profile__info">
            {/* Изменение оступа при ошибке в момент редактирования профиля */}
            {/* <div className="profile__info profile__info-error">  */}
            <label className="profile__input-container profile__input-container_type_name">
              Имя
              <input
                className="profile__text profile__text_input"
                type="text"
                name="name"
                placeholder="Введите имя"
                minLength="2"
                maxLength="30"
                id="name-id"
                value={user.name}
              />
            </label>
            <label className="profile__input-container profile__input-container_type_email">
              E-mail
              <input
                className="profile__text profile__text_input"
                type="email"
                name="email"
                placeholder="Укажите e-mail"
                id="email-id"
                value={user.email}
              />
            </label>
          </div>
          <div className="profile__btns">
            {!isEditProfile && (
                <button
                  className="profile__btn profile__btn_type_edit"
                  type="button"
                  onClick={handleClickEditProfile}
                >
                  Редактировать
                </button>
              )}

            <span className="profile__error"></span>
            {isEditProfile && (
              <button
                className="profile__btn profile__btn_type_save"
                type="submit"
                onClick={handleClickSaveProfile}
              >
                Сохранить
              </button>
            )}
          </div>
        </form>

        <div className="profile__btns">
          {!isEditProfile && (
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
