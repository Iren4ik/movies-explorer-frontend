import './App.css';
import userData from "../../utils/user.js";
// import moviesData from "../../utils/movies.js";
import React, { useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";
import PageNotFound from "../PageNotFound/PageNotFound";

function App() {
  const { pathname } = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const footer =
    pathname === "/" || pathname === "/movies" || pathname === "/saved-movies";

  const header =
    pathname === "/" ||
    pathname === "/movies" ||
    pathname === "/saved-movies" ||
    pathname === "/profile";

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
        <Route path="/profile" element={<Profile user={userData} />} />
        <Route path="/signup" element={<Register user={userData} />} />
        <Route path="/signin" element={<Login user={userData} />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      {footer && <Footer />}
    </div>
  );
}

export default App;
