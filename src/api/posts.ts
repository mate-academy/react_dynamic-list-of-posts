import { BASE_URL } from './api';

export const request = (
  endpoint = '/posts',
  postId = '',
  userId = '',
  methodParam = 'GET',
) => {
  return fetch(`${BASE_URL}${endpoint}${postId}${userId}`, { method: methodParam })
    .then(response => {
      if (!response.ok) {
        return new Error(`${response.status} -- ${response.statusText}`);
      }

      return response.json();
    });
};

export const getUserPosts = (userId: number) => {
  if (!userId) {
    return request('/posts');
  }

  return request('/posts', '', `?userId=${+userId}`);
};

export const getPostDetails = (postId: number) => {
  return request('/posts', `/${postId}`);
};

export const getPostComments = (postId: number) => {
  return request('/comments', '', `?postId=${postId}`);
};

export const removeComment = (commentId: number) => {
  return request('/comments', '', `/${commentId}`, 'DELETE');
};

export const submitComment = (comment: {}) => {
  return fetch(`${BASE_URL}/comments`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(comment),
  });
};
