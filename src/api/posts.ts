import { request } from './api';

export const getUserPosts = (userId = 0) => {
  if (userId < 1) {
    return request('/posts');
  }

  return request(`/posts?userId=${userId}`);
};

export const getPostDetails = (postId: number) => {
  return request(`/posts/${postId}`);
};
