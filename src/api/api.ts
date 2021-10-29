export const BASE_URL = 'https://mate.academy/students-api';

export const getUsers = () => {
  return fetch(`${BASE_URL}/users`)
    .then(res => res.json());
};

export const getPosts = () => {
  return fetch(`${BASE_URL}/posts`)
    .then(res => res.json());
};

export const getComments = () => {
  return fetch(`${BASE_URL}/comments`)
    .then(res => res.json());
};
