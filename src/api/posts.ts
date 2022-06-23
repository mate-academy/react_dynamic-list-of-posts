import { request } from './api';

export const getUserPosts = (userId: number) => {
  return request(`/posts?userId=${userId}`);
};

export const getPostById = (postId: number) => {
  return request(`/posts/${postId}`);
};
