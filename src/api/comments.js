import { request, BASE_URL } from './api';

export const getComments = postId => request(`/comments?postId=${postId}`);

const remove = url => request(url, { method: 'DELETE' });

export const delCommentFromServer
  = commentId => remove(`/comments/${commentId}`);

export function pushCommentToServer(comment) {
  return fetch(`${BASE_URL}/comments`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(comment),
  });
}
