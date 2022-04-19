import { BASE_URL, COMMENTS } from './api';

export const getPostComments = (postId: number) => {
  return fetch(`${BASE_URL}${COMMENTS}?postId=${postId}`)
    .then(response => response.json());
};

export const deleteComment = (commentId: number) => {
  return fetch(`${BASE_URL}${COMMENTS}/${commentId}`, { method: 'DELETE' })
    .then(response => response.json());
};
