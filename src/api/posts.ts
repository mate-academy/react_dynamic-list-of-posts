import { POSTS_URL } from './api';

export const getUserPosts = (userId = 0) => {
  let queryParameters = '';

  if (userId) {
    queryParameters = `?userId=${userId}`;
  }

  return fetch(`${POSTS_URL}${queryParameters}`)
    .then(response => response.json());
};

export const getPostDetails = (postId = 0) => {
  return fetch(`${POSTS_URL}/${postId}`)
    .then(response => response.json());
};
