import { Post } from '../types/Post';
import { BASE_URL } from './api';

export const getAllPosts = (): Promise<Post[]> => {
  return fetch(`${BASE_URL}/posts`)
    .then(response => response.json());
};

export const getUserPosts = (userId: number) => {
  return fetch(`${BASE_URL}/posts?userId=${userId}`)
    .then(response => response.json());
};

export const getPostDetails = (postId: number) => {
  return fetch(`${BASE_URL}/posts/${postId}`)
    .then(response => response.json());
};
