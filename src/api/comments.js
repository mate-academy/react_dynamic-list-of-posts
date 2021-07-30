import { BASE_URL } from './api';

export async function getPostComments(postId) {
  return fetch(`${BASE_URL}/comments`)
    .then(response => response.json())
    .then(response => response.data)
    .then(comments => comments.filter(comment => comment.postId === postId))
    .catch(
      // eslint-disable-next-line
      error => console.error(error)
    );
}

export async function removeComment(id) {
  await fetch(`${BASE_URL}/comments/${id}`, { method: 'DELETE' });
}

export async function addComment(comment) {
  await fetch(`${BASE_URL}/comments`, {
    method: 'POST',
    body: JSON.stringify(comment),
  });
}
