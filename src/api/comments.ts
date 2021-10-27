import { BASE_URL } from './api';

export function getComments(postId: number) {
  return fetch(`${BASE_URL}/comments?postId=${postId}`)
    .then(response => response.json())
    .then(comments => comments);
}

export function deleteComment(id: number) {
  return fetch(`${BASE_URL}/comments/${id}`, {
    method: 'DELETE',
  })
    .then(response => response.json());
}

export function addComment(comment: Partial<PostComment>) {
  return fetch(`${BASE_URL}/comments`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(comment),
  })
    .then(response => response.json());
}
