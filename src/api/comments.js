import { request } from './api';

export async function getPostComments(postId) {
  const comments = await request(`/comments`);

  return comments.filter(comment => comment.postId === +postId);
}

export async function deleteComment(commentId) {
  await request(`/comments/${commentId}`, 'DELETE');
}

export async function addComment(comment) {
  await request(`/comments`, 'POST', JSON.stringify(comment));
}
