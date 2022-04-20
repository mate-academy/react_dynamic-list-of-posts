import { Post, User, Comment } from '../types';

export const BASE_URL = 'https://mate.academy/students-api';

export function getAllPosts(): Promise<Post[]> {
  return fetch(`${BASE_URL}/posts`)
    .then(response => response.json());
}

export function getAllUsers(): Promise<User[]> {
  return fetch(`${BASE_URL}/users`)
    .then(response => response.json());
}

export function getAllComments(): Promise<Comment[]> {
  return fetch(`${BASE_URL}/comments`)
    .then(response => response.json());
}
