import { request } from './api';
import { FetchComment } from '../types/Comment';

export const getPostComments = (postId: number) => (
  request(`/comments?postId=${postId}`)
);

export const deleteComment = (commentId: number) => (
  request(`/comments/${commentId}`, {
    method: 'DELETE',
  }));

export const addComment = (comment: FetchComment) => (
  request('/comments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(comment),
  })
);
