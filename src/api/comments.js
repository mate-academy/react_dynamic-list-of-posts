import { BASE_URL } from './api';

export async function getPostComments(postId) {
  const responce = await fetch(`${BASE_URL}/comments/`);
  const result = await responce.json();
  const comments = await result.data;
  const filterComments = comments.filter(comment => comment.postId === postId);

  return filterComments;
}

export function addComment(name, email, body, postId) {
  return fetch(`${BASE_URL}/comments/`, {
    method: 'POST',
    body: JSON.stringify({
      name,
      email,
      body,
      postId,
    }),
  });
}

export function deleteComment(commentId) {
  return fetch(`${BASE_URL}/comments/${commentId}`, {
    method: 'DELETE',
  });
}
