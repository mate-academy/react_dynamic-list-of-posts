import { request } from './api';

export const getAllPosts = () => {
  return request('/posts');
};

export const getUserPosts = (userId: string) => {
  return request(`/posts?userId=${userId}`);
};
