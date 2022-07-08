import { BASE_URL } from './api';

export const getPosts = (userId: number) => {
  if (userId !== 0) {
    return fetch(`${BASE_URL}/posts?userId=${userId}`)
      .then(response => response.json());
  }

  return fetch(`${BASE_URL}/posts`)
    .then(response => response.json());
};

export const getPostDetails = (postId: number) => {
  return fetch(`${BASE_URL}/posts/${postId}`)
    .then(response => response.json());
};
