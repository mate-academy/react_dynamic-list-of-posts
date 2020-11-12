import { BASE_URL } from './api';

export async function getPostComments(postId) {
  const response = await fetch(`${BASE_URL}/comments`);
  const result = await response.json();

  const filteredComments = result.data.filter(comment => (
    comment.postId === postId));

  return filteredComments;
}

export async function deleteComment(commentId) {
  const response = await fetch(`${BASE_URL}/comments/${commentId}`,
    { method: 'DELETE' });
  const result = await response.json();

  return result.data;
}

export async function addCommentToServer(newComment) {
  return fetch(`${BASE_URL}/comments/`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(newComment),
  });
}
