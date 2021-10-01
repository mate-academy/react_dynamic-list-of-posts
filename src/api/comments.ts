import { request } from './api';

export const loadPostComments = (postId: number) => {
  return request(`/comments?postId=${postId}`);
};

export const addCommentToServer = (newComment: Partial<Comment>) => {
  return request('/comments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(newComment),
  });
};

export const deleteCommentFromServer = (commentId: number) => {
  return request(`/comments/${commentId}`, {
    method: 'DELETE',
  });
};
