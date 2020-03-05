export const API_URL = 'https://jsonplaceholder.typicode.com';

export const getUsers = () => {
  return fetch(`${API_URL}/users`)
    .then(response => response.json());
};

export const getPosts = () => {
  return fetch(`${API_URL}/posts`)
    .then(response => response.json());
};

export const getComments = () => {
  return fetch(`${API_URL}/comments`)
    .then(response => response.json());
};
