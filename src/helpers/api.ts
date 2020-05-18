import { URL_API } from '../constants';

export const getPosts = (): Promise<Post[]> => {
  return fetch(`${URL_API}/posts`)
    .then(response => response.json());
};

export const getComments = (): Promise<Comment[]> => {
  return fetch(`${URL_API}/comments`)
    .then(response => response.json());
};

export const getUsers = (): Promise<User[]> => {
  return fetch(`${URL_API}/users`)
    .then(response => response.json());
};
