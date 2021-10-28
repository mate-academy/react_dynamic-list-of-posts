import { BASE_URL } from './api';

export function getPostComments(postId: number) {
  return fetch(`${BASE_URL}/comments?postId=${postId}`)
    .then(response => response.json());
}

export function removePostComment(commentId: number) {
  return fetch(`${BASE_URL}/comments/${commentId}`, {
    method: 'DELETE',
  })
    .then(response => response.json());
}

export function createPostComment(data: BaseComment) {
  return fetch(`${BASE_URL}/comments`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(data),
  })
    .then(response => response.json());
}
