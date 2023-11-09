import { MAIN_API_URL } from "./constants";

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Произошла ошибка ${res.status} : ${res.statusText}`);
}

export const register = (name, email, password) => {
  return fetch(`${MAIN_API_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, email, password })
  })
  .then(res => checkResponse(res))
}; 

export const login  = (email, password) => {
  return fetch(`${MAIN_API_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
  .then(res => checkResponse(res))
}; 

export const updateUserInfo = (dataUser) => {
  return fetch(`${MAIN_API_URL}/users/me`, {
    method: "PATCH",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({
      name: dataUser.name,
      email: dataUser.email,
    }),
  })
  .then(res => checkResponse(res));
};

export const getProfileInfo = (token) => {
  return fetch(`${MAIN_API_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then(res => checkResponse(res))
  .then(data => data)
};

export const getContent = (token) => {
  return fetch(`${MAIN_API_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then(res => checkResponse(res))
  .then(data => data)
};

