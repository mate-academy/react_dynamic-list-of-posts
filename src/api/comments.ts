import { BASE_URL } from './api';
import { NewComment } from '../react-app-env';

export async function getPostComments(postId: number) {
  const response = await fetch(`${BASE_URL}/comments?postId=${postId}`);

  return response.json();
}

export async function deleteComment(commentId: number) {
  const response = await fetch(`${BASE_URL}/comments/${commentId}`,
    { method: 'DELETE' });

  return response.json();
}

export async function addComment(comment: NewComment) {
  const response = await fetch(`${BASE_URL}/comments`, {
    method: 'POST',
    body: JSON.stringify(comment),
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
  });

  return response.json();
}
