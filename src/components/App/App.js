import './App.css';
import userData from "../../utils/user.js";
import React, { useState } from "react";
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
import { register, login } from "../../utils/MainApi.js"

function App() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // const [isRegister, setIsRegister] = React.useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const footer =
    pathname === "/" || pathname === "/movies" || pathname === "/saved-movies";

  const header =
    pathname === "/" ||
    pathname === "/movies" ||
    pathname === "/saved-movies" ||
    pathname === "/profile";

    function handleLogin(email, password) {
      setLoading(true);
      login(email, password)
      .then((data) => {
        if (data.token) {
          setLoggedIn(true);
          localStorage.setItem("token", data.token);
          navigate('/movies', {replace: true});
          console.log(isLoggedIn);
        }
      })
      .catch(() => {
        setLoggedIn(false);
        console.error();
      })
      .finally(() => setLoading(false));
    }

    function handleRegister(name, email, password) {
      setLoading(true);
      register(name, email, password)
      .then((res) => {
        if (res._id) {
          handleLogin(email, password);
          console.log(isLoggedIn);
        }
      })
      .catch(() => {
        console.error();
      })
      .finally(() => setLoading(false));
    }
    
    function handleLogout() {
      setLoggedIn(false);
      localStorage.removeItem("token");
      localStorage.removeItem("foundMovies");
      localStorage.removeItem("filterState");
      localStorage.removeItem("moviesSearchQuery");
      localStorage.removeItem("allMovies");
      navigate("/");
      console.log(isLoggedIn);
    }

  return (
    <div className="App">
      {header && <Header isLoggedIn={isLoggedIn} />}
      <Routes>
        <Route path="/" element={<Main user={userData} />} />
        <Route path="/movies" 
          element={<Movies />} />
        <Route
          path="/saved-movies"
          element={<SavedMovies />}
        />
        <Route path="/profile" element={
          <Profile user={userData} onLogout={handleLogout}/>
        } />
        <Route path="/signup" element={
          <Register user={userData} onRegister={handleRegister} isLoading={isLoading}/>
        } />
        <Route path="/signin" element={
          <Login user={userData} onLogin={handleLogin} isLoading={isLoading}/>
        } />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      {footer && <Footer />}
    </div>
  );
}

export default App;
