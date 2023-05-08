import handleResponce from "./utils";

export const BASE_URL = 'https://mintolime-mesto-pr.nomoredomains.monster';

// export const BASE_URL = 'https://auth.nomoreparties.co';

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

export const register = ({ email, password }) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ email, password }),
    credentials: 'include',
  }).then((res) => handleResponce(res));
};

export const authorize = ({ email, password }) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ email, password }),
    credentials: 'include',
  }).then((res) => handleResponce(res));
};

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    credentials: 'include',
    // headers: {
    //   ...headers,
    //   Authorization: `Bearer ${token}`,
    // },
  }).then((res) => handleResponce(res));
};
