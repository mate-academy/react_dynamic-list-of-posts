import { request } from './api';

export const getUserPosts = (userId: number) => {
  if (userId === 0) {
    return request('/posts');
  }

  return request(`/posts?userId=${userId}`);
};

export const getPostDetails = (postId: number | null) => {
  return request(`/posts/${postId}`);
};
