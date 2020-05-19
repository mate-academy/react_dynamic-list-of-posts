const URL = 'https://jsonplaceholder.typicode.com';

export const getPostsFromServer = () => {
  return fetch(`${URL}/posts`)
    .then(response => response.json());
};

export const getCommentsFromServer = () => {
  return fetch(`${URL}/comments`)
    .then(response => response.json());
};

export const getUsersFromServer = () => {
  return fetch(`${URL}/users`)
    .then(response => response.json());
};
