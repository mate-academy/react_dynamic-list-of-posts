import { BASE_URL } from './api';

export const getAllPosts = () => fetch(`${BASE_URL}/posts`)
  .then(response => response.json());

export const getUserPosts = userId => fetch(
  `${BASE_URL}/posts?userId=${userId}`,
)
  .then(response => response.json());

export const getPostDetails = postId => fetch(`${BASE_URL}/posts/${postId}`)
  .then(response => response.json());
