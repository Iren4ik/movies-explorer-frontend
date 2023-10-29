import { Link } from "react-router-dom";
import { useState } from "react";
import "./Profile.css";

function Profile({ user }) {
  const [isEditProfile, setEditProfile] = useState(false);

  const handleClickEditProfile = () => {
    setEditProfile(true);
  };

  const handleClickSaveProfile = () => {
    setEditProfile(false);
  };

  return (
    <main className="profile">
      <h1 className="profile__title">Привет, {user.name}!</h1>
      <form className="profile__form" name="edit-profile">
        <div className="profile__info">
        {/* Изменение оступа при ошибке в момент редактирования профиля */}
        {/* <div className="profile__info profile__info-error">  */}
          <label className="profile__input-container profile__input-container_type_name">
            <p className="profile__text">Имя</p>
            <input
              className="profile__text profile__text_input"
              type="text"
              name="name"
              form="edit-profile"
              placeholder="Введите имя"
              minLength="2"
              maxLength="30"
              id="name-id"
              value={user.name}
            />
          </label>
          <label className="profile__input-container profile__input-container_type_email">
            <p className="profile__text">E-mail</p>
            <input
              className="profile__text profile__text_input"
              type="email"
              name="email"
              form="edit-profile"
              placeholder="Укажите e-mail"
              id="email-id"
              value={user.email}
            />
          </label>
        </div>

        <div className="profile__btns">
          {!isEditProfile && (
            <>
            <button 
              className="profile__btn profile__btn_type_edit" 
              type="button"
              onClick={handleClickEditProfile}
            >
              Редактировать
            </button>
            <Link to="/signin" className="profile__btn profile__btn_type_logout">
              Выйти из аккаунта
            </Link>
            </>
          )}
          {/* Вывод ошибки при редактировании профиля */}
          {/* <span className="profile__error">
            При обновлении профиля произошла ошибка.
          </span> */}
          {isEditProfile && (
          <button 
            className="profile__btn profile__btn_type_save" 
            type="button"
            onClick={handleClickSaveProfile}
          > 
          Сохранить
          </button>)}

          {/* Неактивная кнопка сохранения */}
          {/* <button
            className="profile__btn profile__btn_type_save profile__btn_disable"
            type="button"
          >
            Сохранить
          </button> */}
        </div>
      </form>
    </main>
  );
}

export default Profile;
