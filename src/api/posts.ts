import { BASE_URL } from './api';

export const getUserPosts = (userId: number) => {
  return fetch(`${BASE_URL}/posts?userId=${userId}`)
    .then(response => {
      return response.json();
    });
};

export const getPosts = () => {
  return fetch(`${BASE_URL}/posts`)
    .then(response => {
      return response.json();
    });
};

export const getPostDetails = (postId: number) => {
  return fetch(`${BASE_URL}/posts/${postId}`)
    .then(response => {
      return response.json();
    });
};

export const getPostComments = (postId: number) => {
  return fetch(`${BASE_URL}/comments?postId=${postId}`)
    .then(response => {
      return response.json();
    });
};
