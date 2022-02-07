import { request } from './api';

export const getPosts = () => {
  return request('/posts');
};

export const getUserPosts = (userId: number) => {
  return request(`/posts?userId=${userId}`);
};

export const getPostDetails = (postId: number) => {
  return request(`/posts?id=${postId}`);
};
