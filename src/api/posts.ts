import { request } from './api';

export const getUserPosts = (userId: number) => {
  return userId === 0
    ? request('/posts')
    : request(`/posts?userId=${userId}`);
};

export const getPostDetails = (postId: number) => {
  return request(`/posts/${postId}`);
};

export const getPostComments = (postId: number) => {
  return request(`/comments?postId=${postId}`);
};
