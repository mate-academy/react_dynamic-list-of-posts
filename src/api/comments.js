import { BASE_URL, request } from './api';

export function getPostComments(postId) {
  return request(`${BASE_URL}/comments?postId=${postId}`);
}

export function removePostComment(postId) {
  return request(`${BASE_URL}/comments/${postId}`, {
    method: 'DELETE',
  });
}

export function addPostComment(comment) {
  return request(`${BASE_URL}/comments`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(comment),
  });
}
