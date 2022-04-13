import { Post } from '../react-app-env';
import { BASE_URL } from './api';

export const getUserPosts = (userId: string): Promise<Post[]> => {
  return fetch(`${BASE_URL}/posts?userId=${userId}`)
    .then(response => response.json());
};

export const getPostDetail = (postId: number): Promise<Post> => {
  return fetch(`${BASE_URL}/posts/${postId}`)
    .then(response => response.json());
};
