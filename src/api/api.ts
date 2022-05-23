import { Post } from '../types';

export const BASE_URL = 'https://mate.academy/students-api';

export const POSTS = '/posts';
export const COMMENTS = '/comments';
const USERS = '/users';

export function getAllPosts(): Promise<Post[]> {
  return fetch(`${BASE_URL}${POSTS}`).then(response => response.json());
}

export function getAllComments(): Promise<Comment[]> {
  return fetch(`${BASE_URL}${COMMENTS}`).then(response => response.json());
}

export const getAllUsers = () => {
  return fetch(BASE_URL + USERS).then(response => response.json());
};
