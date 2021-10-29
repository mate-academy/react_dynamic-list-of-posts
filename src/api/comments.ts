import { COMMENTS_URL } from './api';

export const getPostComments = (postId: number) => {
  return fetch(`${COMMENTS_URL}?postId=${postId}`)
    .then(response => response.json());
};

export const deletePostComment = (commentId: number) => {
  return fetch(`${COMMENTS_URL}/${commentId}`, { method: 'DELETE' });
};

export const postPostComment = (newComment: Partial<Comment>) => {
  return fetch(COMMENTS_URL, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(newComment),
  }).then(response => response.json());
};
