import { MAIN_API_URL, MOVIES_API_URL } from "./constants";

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Произошла ошибка ${res.status} : ${res.statusText}`);
}

export const register = (name, email, password) => {
  return fetch(`${MAIN_API_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  }).then((res) => checkResponse(res));
};

export const login = (email, password) => {
  return fetch(`${MAIN_API_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => checkResponse(res));
};

export const updateUserInfo = (dataUser) => {
  return fetch(`${MAIN_API_URL}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({
      name: dataUser.name,
      email: dataUser.email,
    }),
  }).then((res) => checkResponse(res));
};

export const getProfileInfo = (token) => {
  return fetch(`${MAIN_API_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => checkResponse(res))
    .then((data) => data);
};

export const getMovies = (token) => {
  return fetch(`${MAIN_API_URL}/movies`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => checkResponse(res))
    .then((data) => data);
};

export const saveMovie = (movie, token) => {
  return fetch(`${MAIN_API_URL}/movies`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      country: movie.country,
      director: movie.director,
      duration: movie.duration,
      description: movie.description,
      year: movie.year,
      image: `${MOVIES_API_URL}${movie.image.url}`,
      trailerLink: movie.trailerLink,
      thumbnail: `${MOVIES_API_URL}${movie.image.formats.thumbnail.url}`,
      movieId: movie.id,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN,
    }),
  }).then((res) => checkResponse(res));
};

export const deleteMovie = (movieId, token) => {
  return fetch(`${MAIN_API_URL}/movies/${movieId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => checkResponse(res));
};
