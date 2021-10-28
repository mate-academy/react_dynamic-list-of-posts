import { request } from './api';

export const getPostComments = (postId: number) => {
  return request(`/comments?postId=${postId}`);
};

export const postComment = (newComment: Partial<Comment>) => {
  return request('/comments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(newComment),
  });
};

export const removeComment = (commentId: number) => {
  return request(`/comments/${commentId}`, {
    method: 'DELETE',
  });
};
