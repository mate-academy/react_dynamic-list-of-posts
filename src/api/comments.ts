import { request, BASE_URL } from './api';

export const getPostComments = (postId: number | null) => {
  return request(`/comments?postId=${postId}`);
};

export const deleteComment = (commentId: number | null) => {
  return fetch(`${BASE_URL}/comments/${commentId}`, {
    method: 'DELETE',
  });
};

export const postComment = (postId: number | null, name: string, email: string, body: string) => {
  return fetch(`${BASE_URL}/comments`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({
      postId,
      name,
      email,
      body,
    }),
  });
};
