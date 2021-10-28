import { request } from './api';

export const getPostComments = async (postId: number) => {
  return request(`/comments?postId=${postId}`);
};

export const deleteComment = async (commentId: number) => {
  return request(`/comments/${commentId}`, { method: 'DELETE' });
};

export const addComment = async (newComment: Comment) => {
  return request('/comments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(newComment),
  });
};
