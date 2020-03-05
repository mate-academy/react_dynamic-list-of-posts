const API_URL = 'https://jsonplaceholder.typicode.com';

export const getPosts = (): Promise<Post[]> => {
  return fetch(`${API_URL}/posts`)
    .then(response => response.json());
};

export const getUsers = (): Promise<User[]> => {
  return fetch(`${API_URL}/users`)
    .then(response => response.json());
};

export const getComments = (): Promise<Comment[]> => {
  return fetch(`${API_URL}/comments`)
    .then(response => response.json());
};
