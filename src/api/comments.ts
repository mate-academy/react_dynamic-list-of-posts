import { request } from './api';

export const getPostComments = (postId: number) => {
  return request<Comment[]>(`comments?postId=${postId}`);
};

export const deleteComment = (commentId: number) => {
  return request<Comment>(`comments/${commentId}`, {
    method: 'DELETE',
  });
};

export const addComment = (comment: NewComment) => {
  return request<Comment>('comments', {
    method: 'POST',
    body: JSON.stringify(comment),
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
