import { BASE_URL } from './api';

export const getPostComments = postId => fetch(`${BASE_URL}/comments`)
  .then(response => response.json())
  .then(result => result.data)
  .then(comments => comments.filter(comment => comment.postId === postId));

export async function removeComment(id) {
  await fetch(`${BASE_URL}/comments/${id}`, { method: 'DELETE' });
}

export async function addComment(comment) {
  await fetch(`${BASE_URL}/comments`, {
    method: 'POST',
    body: JSON.stringify(comment),
  });
}
