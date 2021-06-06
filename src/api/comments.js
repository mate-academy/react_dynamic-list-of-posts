import { get, remove, post } from './api';

export function getPostComments(postId) {
  return get(`/comments?postId=${postId}`);
}

export function deleteComment(commentId) {
  return remove(`/comments/${commentId}`);
}

export function addComment(comment) {
  return post(`/comments`, comment);
}
