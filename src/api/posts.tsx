import { BASE_URL } from './api';

export const getPosts = (target = '') => {
  return fetch(`${BASE_URL}/posts${target}`).then(response => response.json());
};

export const getUserPosts = (userId:number) => {
  return getPosts(`${userId ? `?userId=${userId}` : ''}`);
};

export const getPostDetails = (postId:number) => {
  return getPosts(`/${postId}`);
};
