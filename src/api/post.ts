import { request } from './api';

export const getPosts = () => {
  return request('/posts');
};

export const getUserPosts = (userId?: number) => {
  if (!userId) {
    return getPosts();
  }

  return request(`/posts?userId=${userId}`);
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

export const createComment = (newComment: UnpablishedComment) => {
  return request('/comments', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newComment),
  });
};

export const getUsers = () => {
  return request('/users');
};
