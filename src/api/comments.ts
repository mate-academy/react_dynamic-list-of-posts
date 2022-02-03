import { BASE_URL } from './api';
import { request } from './post';

export type Comment = {
  id: number,
  postId: number,
  name: string,
  email: string,
  body: string,
  createdAt: string,
  updatedAt: string,
};

export function getPostComments(postId: number) {
  return request(`${BASE_URL}/comments?postId=${postId}`)
    .then(comments => {
      return comments.filter((comment: Comment) => comment.postId === postId);
    });
}

export const createComment = (comment: Comment) => {
  return fetch(`${BASE_URL}/comments`, {
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
