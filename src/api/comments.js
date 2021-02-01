import { BASE_URL } from './api';

export function getPostComments(postId) {
  return fetch(`${BASE_URL}/comments`)
    .then(response => response.json())
    .then(result => (
      result.data
        .filter(item => item.postId && item.body && item.postId === postId)
    ));
}

export function addComment(name, email, body, postId) {
  return fetch(`${BASE_URL}/comments`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({
      name,
      email,
      body,
      postId,
    }),
  })
    .then(response => response.json());
}

export function deleteComment(postId) {
  return fetch(`${BASE_URL}/comments/${postId}`, {
    method: 'DELETE',
  })
    .then(response => response.json());
}
