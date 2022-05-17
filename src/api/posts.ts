import { request } from './api';

export const getUsers = () => {
  return request('/users');
};

export const getPosts = () => {
  return request('/posts');
};

export const getPostDetails = (postId: number) => {
  return request(`/posts/${postId}`);
};

export const getPostComments = (postId: number) => {
  return request(`/comments?postId=${postId}`);
};

export const removeComment = (commentId: number) => {
  return request(`/comments/${commentId}`, {
    method: 'DELETE',
  });
};

export const getUserPosts = (userId?: number) => {
  if (!userId) {
    return getPosts();
  }

  return request(`/posts?userId=${userId}`);
};
