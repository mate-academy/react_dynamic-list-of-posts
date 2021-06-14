import { request, remove, post } from './api';

export const getComments = () => request(`/comments`);

export function getCommentsPost(postId) {
  return request(`/comments?postId=${postId}`);
}

export const getCommentDelete = commentId => remove(`/comments/${commentId}`);

export function addComment(comments) {
  return post(`/comments`, comments);
}
