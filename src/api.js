const API_URL = 'https://jsonplaceholder.typicode.com/';

export const getPosts = () => fetch(`${API_URL}posts`)
  .then(responce => responce.json());

export const getUsers = () => fetch(`${API_URL}users`)
  .then(responce => responce.json());

export const getComments = () => fetch(`${API_URL}comments`)
  .then(responce => responce.json());
