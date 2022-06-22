import { BASE_URL } from './api';

export const getUserPosts = (userId: string) => {
  if (userId === '0') {
    return fetch(`${BASE_URL}/posts`)
      .then(response => response.json());
  }

  return fetch(`${BASE_URL}/posts?userId=${userId}`)
    .then(response => response.json());
};

export const getPostDetails = (postId: string) => {
  return fetch(`${BASE_URL}/posts/:${postId}`)
    .then(response => response.json());
};
