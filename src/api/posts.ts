import { request } from './api';

export const getUserPosts = async (userId: number) => {
  return request(`/posts?userId=${userId}`);
};

export const getPosts = async () => {
  return request('/posts');
};

export const getPostsDetails = async (postId: number) => {
  return request(`/post/:${postId}`);
};
