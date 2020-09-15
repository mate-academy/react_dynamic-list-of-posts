import { BASE_URL } from './api';

export async function getPostComments(postId) {
  const response = await fetch(`${BASE_URL}/comments`);

  const result = await response.json();

  return result.data.filter(comment => comment.postId === postId);
}

export async function addComment(postId, name, email, body) {
  const request = {
    method: 'POST',
    body: JSON.stringify({
      postId,
      name,
      email,
      body,
    }),
  };

  const response = await fetch(`${BASE_URL}/comments`, request);

  return response.json();
}

export async function deleteComment(id) {
  const request = {
    method: 'DELETE',
  };

  const response = await fetch(`${BASE_URL}/comments/${id}`, request);

  return response.json();
}
