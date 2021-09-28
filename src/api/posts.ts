import { request } from './api';

export const getUserPosts = async (userId: number) => {
  return request(`/posts?userId=${userId}`);
};

export const getPosts = async () => {
  return request('/posts');
};

export const getPostDetails = async (postId: number) => {
  return request(`/posts/:${postId}`);
};
