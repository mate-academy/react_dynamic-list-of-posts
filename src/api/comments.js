import { request } from './api';

export function getPostComments(postId) {
  return request(`/comments?postId=${postId}`);
}

export function removeCommentFromServer(commentId) {
  return request(`/comments/${commentId}`, { method: 'DELETE' });
}

export function addCommentToServer(newComment) {
  return request(`/comments`, {
    method: 'POST',
    body: JSON.stringify(newComment),
  });
}
