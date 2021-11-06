import { BASE_URL, request } from './api';

export const getComments = (postId: number) => request(`/comments?postId=${postId}`);

export const deleteComment = (commentId: number) => {
  return fetch(`${BASE_URL}/comments/${commentId}`, { method: 'DELETE' })
    .then(responce => {
      if (!responce.ok) {
        throw new Error(`${responce.status} -- ${responce.statusText}`);
      }

      return responce.json();
    });
};

export const addComment = (
  postId: number,
  name: string,
  email: string,
  comment: string,
) => {
  return fetch(`${BASE_URL}/comments`, {
    method: 'POST',
    body: JSON.stringify({
      postId,
      name,
      email,
      body: comment,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then(responce => responce.json());
};
