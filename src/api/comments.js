import { BASE_URL } from './api';

export function request(url, options = { method: 'GET' }) {
  return fetch(`${BASE_URL}/${url}`, options)
    .then(promise => promise.json())
    .then(result => result.data);
}

export function getPostComments() {
  return request('comments');
}

export function createPostComments(postId, name, email, body) {
  return request(`comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify({
      postId,
      name,
      email,
      body,
    }),
  });
}

export function removeComment(commentId) {
  return request(`comments/${commentId}`, { method: 'DELETE' });
}
