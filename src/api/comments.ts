import { BASE_URL } from './api';

export const getPostComments = (postId: number | null): Promise<IComment[]> => {
  return fetch(`${BASE_URL}/comments?postId=${postId}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Some error');
      }

      return response.json();
    });
};

export const deleteComment = (id: number): Promise<Response> => {
  return fetch(`${BASE_URL}/comments/${id}`, {
    method: 'DELETE',
  });
};

export const createComment = (comment: NewComment) => {
  return fetch(`${BASE_URL}/comments`, {
    method: 'POST',
    body: JSON.stringify(comment),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then(response => response.json());
};
