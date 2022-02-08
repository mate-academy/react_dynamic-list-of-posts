import { BASE_URL } from './api';
import { request } from './post';

type Comment = {
  postId: number,
  name: string,
  email: string,
  body: string,
};

export function getPostComments(postId: number) {
  return request(`${BASE_URL}/comments?postId=${postId}`);
}

export const createComment = (comment: Comment, postId: number) => {
  return fetch(`${BASE_URL}/comments?postId=${postId}`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(comment),
  });
};

export const deleteComment = (id: number) => {
  return fetch(
    `${BASE_URL}/comments/${id}`,
    { method: 'DELETE' },
  );
};
