import { request } from './api';

export const getPostComments = async (postId: number) => {
  return request(`/comments?postId=${postId}`);
};

export const addComment = async (newComment: Comment) => {
  return request('/comments', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(newComment),
  });
};

export const deleteComment = async (commentsId: number) => {
  return request(`/comments/${commentsId}`, { method: 'DELETE' });
};
