import './App.css';
import React, { useState, useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";
import PageNotFound from "../PageNotFound/PageNotFound";
import ProtectedRouteElement from "../ProtectedRoute/ProtectedRoute";
import { register, login, updateUserInfo, getProfileInfo, getContent } from "../../utils/MainApi.js"
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function App() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [registerError, setRegisterError] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [updateError, setUpdateError] = useState(false);
  const [isEditingProfile, setEditingProfile] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isNewEntranceOnPage, setNewEntranceOnPage] = useState(false);

  const footer =
    pathname === "/" || pathname === "/movies" || pathname === "/saved-movies";

  const header =
    pathname === "/" ||
    pathname === "/movies" ||
    pathname === "/saved-movies" ||
    pathname === "/profile";

    //Получение данных пользователя, если залогинился
    useEffect(() => {
      if (isLoggedIn) {
        const token = localStorage.getItem('token');
        getProfileInfo(token)
          .then((dataUser) => {
            setCurrentUser(dataUser);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }, [isLoggedIn]);

    //Проверка токена при загрузке страницы
    useEffect(() => {
      const token = localStorage.getItem('token');
      if (token) {
        getContent(token)
          .then((res) => {
            if (res) {
              setLoggedIn(true);
              // navigate('/movies', {replace: true})
            }
          })
          .catch(console.error);
      } else {
        setLoggedIn(false);
        localStorage.clear();
      }
    }, [navigate]);

    //Авторизация
    function handleLogin(email, password) {
      setLoading(true);
      login(email, password)
        .then((data) => {
          if (data.token) {
            setLoggedIn(true);
            localStorage.setItem("token", data.token);
            navigate('/movies', {replace: true});
            setLoginError(false);
          }
        })
        .catch((err) => {
          setLoggedIn(false);
          setLoginError(true);
          console.error(err);
        })
        .finally(() => setLoading(false));
    }

    //Регистрация
    function handleRegister(name, email, password) {
      setLoading(true);
      register(name, email, password)
        .then((res) => {
          if (res._id) {
            handleLogin(email, password);
            setRegisterError(false);
          }
        })
        .catch((err) => {
          setRegisterError(true);
          console.error(err);
        })
        .finally(() => setLoading(false));
    }

    //Обновление профиля
    function handleUpdateUser(inputValues) {
      setLoading(true);
      updateUserInfo(inputValues)
        .then((dataUser) => {
          setEditingProfile(false);
          setUpdateError(false);
          setCurrentUser(dataUser);
        })
        .catch((err) => {
          setUpdateError(true);
          console.error(err);
        })
        .finally(() => setLoading(false));
    }

    function handleClickEditProfile() {
      setEditingProfile(true);
      setNewEntranceOnPage(false);
    };
    
    // Выход
    function handleLogout() {
      setLoggedIn(false);
      localStorage.clear();
      setCurrentUser({});
      navigate("/");
    }

    function handleEntranceOnProfile() {
      setNewEntranceOnPage(true);
      console.log(isNewEntranceOnPage);
    }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        {header && <Header isLoggedIn={isLoggedIn} newEntrance={handleEntranceOnProfile}/>}
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/movies" element={
            <ProtectedRouteElement loggedIn={isLoggedIn} 
              element={Movies} 
            />} 
          />
          <Route path="/saved-movies" element={
            <ProtectedRouteElement loggedIn={isLoggedIn} 
              element={SavedMovies} 
            />}
          />
          <Route path="/profile" 
          element={
            <ProtectedRouteElement loggedIn={isLoggedIn} 
              element={Profile}
                onEditProfile={handleClickEditProfile}
                onLogout={handleLogout}
                onUpdate={handleUpdateUser}
                isLoading={isLoading}
                updateError={updateError}
                isEditingProfile={isEditingProfile}
                isNewEntranceOnPage={isNewEntranceOnPage}
            />}
          />
          <Route path="/signup" element={
            <Register 
              onRegister={handleRegister} 
              isLoading={isLoading}
              registerError={registerError}
            />
          } />
          <Route path="/signin" element={
            <Login 
              onLogin={handleLogin} 
              isLoading={isLoading}
              loginError={loginError}
            />
          } />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        {footer && <Footer />}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
