import { request } from './api';

export const getUsers = () => {
  return request('/users/');
};

export const getUserPosts = (userId?: number) => {
  return (
    userId ? request(`/posts?userId=${userId}`) : request('/posts')
  );
};

export const getPostDetails = (postId: number) => {
  return request(`/posts/${postId}`);
};
