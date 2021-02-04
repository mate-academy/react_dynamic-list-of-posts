import { request, post, BASE_URL } from './api';

export const getsComments = postId => request(`/comments?postId=${postId}`);

export const addNewComment = (postId, name, email, body) => post(
  '/comments', {
    postId,
    name,
    email,
    body,
  },
);

export const deleteComment = commentId => fetch(
  `${BASE_URL}/comments/${commentId}`, {
    method: 'DELETE',
  },
);
