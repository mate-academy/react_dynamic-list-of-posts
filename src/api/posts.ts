import { request } from './api';

export const getAllPosts = () => {
  return request('/posts');
};

export const getPost = (postId: number) => {
  return request(`/posts/${postId}`);
};

export const getUserPosts = (userId: number) => {
  return request(`/posts?userId=${userId}`);
};
