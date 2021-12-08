import { request } from './api';

export const getUserPosts = (userId?: number) => {
  if (userId) {
    return request(`/posts?userId=${userId}`);
  }

  return request('/posts');
};

export const getPostDetails = (postId: number) => {
  return request(`/posts/${postId}`);
};
