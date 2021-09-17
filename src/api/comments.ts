import { basicRequest } from './api';

const request = (url?: string, option = {}) => {
  return basicRequest(`/comments${url}`, option);
};

export const getPostComments = (postId: number) => {
  return request(`?postId=${postId}`);
};

export const deleteComment = (commentId: number) => {
  return request(`/${commentId}`, { method: 'DELETE' });
};

export const addCommentToServer = (newComment: Partial<Comment>) => {
  return request('', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(newComment),
  });
};
