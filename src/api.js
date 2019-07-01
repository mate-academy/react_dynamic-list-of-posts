const BASE_URL = 'https://jsonplaceholder.typicode.com';

export  const getPosts = () => {
  return fetch(`${BASE_URL}/posts`)
    .then(res => res.json());
}

export  const getUsers = () => {
  return fetch(`${BASE_URL}/users`)
    .then(res => res.json());
}

export  const getComments = () => {
  return fetch(`${BASE_URL}/comments`)
    .then(res => res.json());
}