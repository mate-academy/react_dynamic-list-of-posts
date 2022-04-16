import { request } from './api';

export const getPosts = () => request('/posts');

export const getUserPosts = (userId: number) => {
  return request(`/posts?userId=${userId}`);
};
