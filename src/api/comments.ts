import { request } from './api';

const commentRequest = (url?: string, option = {}) => {
  return request(`/comments${url}`, option);
};

export const getPostComments = (postId: number) => {
  return commentRequest(`?postId=${postId}`);
};

export const deleteComment = (commentId: number) => {
  return commentRequest(`/${commentId}`, { method: 'DELETE' });
};

export const addCommentToServer = (newComment: Partial<CommentTypes>) => {
  return commentRequest('', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(newComment),
  });
};
