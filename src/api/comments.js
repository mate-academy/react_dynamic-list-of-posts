import { BASE_URL, post, request } from './api';

export const getPostComments = postId => request(`/comments?postId=${postId}`);

export const removeComment = commentId => fetch(
  `${BASE_URL}/comments/${commentId}`, { method: 'DELETE' },
);

export const addNewComment = (postId, name, email, body) => post(
  '/comments', {
    postId,
    name,
    email,
    body,
  },
);
