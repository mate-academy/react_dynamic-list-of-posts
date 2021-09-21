import { request } from './api';

export const getPostComments = (postId: number) => request(`/comments?postId=${postId}`);

export const deletePostComments = (commentId: number) => request(`/comments/${commentId}`, { method: 'DELETE' });

export const addPostComment = (comment: IComment) => request('/comments', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
  body: JSON.stringify(comment),
});
